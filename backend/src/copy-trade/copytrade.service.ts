/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, TrxStatus } from '@app/typeorm/entities/transaction.entity';
import { TransactionService } from '@app/transaction/transaction.service';
import { User } from '@app/typeorm/entities/user.entity';
import { CopyTradeDto } from './dto/copyTradeDto';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';
import { ICopyTradeService } from './copytrade';

@Injectable()
export class CopyTradeService implements ICopyTradeService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CopyTrade)
    private readonly copyTradeRepository: Repository<CopyTrade>,
    private readonly trxService: TransactionService,
    // @Inject(Services.MAILS) private readonly mailsService: IMailsService,
  ) {}

  async subscribeUser(
    id: number,
    copyTradeDto: CopyTradeDto,
  ): Promise<CopyTrade> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existingUser)
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);

    if (existingUser.copytrade_balance < copyTradeDto.amount)
      throw new HttpException('Insufficient balance', HttpStatus.CONFLICT);

    existingUser.copytrade_balance -= copyTradeDto.amount;

    const copy = this.copyTradeRepository.create({
      ...copyTradeDto,
      user: { id },
    });

    await this.usersRepository.save(existingUser);
    const complete = await this.copyTradeRepository.save(copy);
    await this.trxService.createTrx(id, {
      service: 'Invested in copy trade',
      category: Category.CopyTrade,
      amount: copyTradeDto.amount,
      status: TrxStatus.Successful,
    });

    return complete;
  }

  async getSubscribedUser(id: number): Promise<CopyTrade[]> {
    const users_copytrade = await this.copyTradeRepository.find({
      where: { user: { id }, expired: false },
    });

    const user = await this.usersRepository.findOne({ where: { id } });

    const validateEach = users_copytrade.filter(async (contract) => {
      // If less than 30 mins dont calculate
      if (Date.now() - new Date(contract.last_update).getTime() < 1800000)
        return true;

      const created_on = new Date(contract.created_at);
      const { roi } = contract;

      if (
        Date.now() >
        new Date(
          created_on.setDate(created_on.getDate() + contract.duration),
        ).getTime()
      ) {
        const shuffle = [roi, roi * 1.534, roi * 2.0073, roi * 2.5344];
        const main_roi = shuffle[Math.floor(Math.random() * shuffle.length)];
        contract.pnl = Number(
          ((Number(contract.amount) * main_roi) / 100).toFixed(4),
        );
        contract.expired = true;
        user.copytrade_balance += Number(contract.amount) + contract.pnl;

        await this.copyTradeRepository.save(contract);
        await this.usersRepository.save(user);
        await this.trxService.createTrx(id, {
          service: 'move PnL to copy trade account',
          amount: contract.pnl,
          category: Category.CopyTrade,
          status: TrxStatus.Successful,
        });

        return false;
      } else {
        const shuffle = [
          roi * -1.534,
          roi * -2.0073,
          roi * -2.5344,
          roi,
          roi * 1.534,
          roi * 2.0073,
          roi * 2.5344,
        ];
        const main_roi = shuffle[Math.floor(Math.random() * shuffle.length)];
        contract.pnl = Number(
          ((Number(contract.amount) * main_roi) / 100).toFixed(4),
        );
        await this.copyTradeRepository.save(contract);

        return true;
      }
    });

    return validateEach;
  }
}
