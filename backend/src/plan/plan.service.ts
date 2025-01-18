/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, TrxStatus } from '@app/typeorm/entities/transaction.entity';
import { TransactionService } from '@app/transaction/transaction.service';
import { User } from '@app/typeorm/entities/user.entity';
import { Plan } from '@app/typeorm/entities/plan.entity';
import { PlanDto } from './dto/PlanDto';
import { IPlanService } from './plan';

@Injectable()
export class PlanService implements IPlanService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private readonly trxService: TransactionService,
    // @Inject(Services.MAILS) private readonly mailsService: IMailsService,
  ) {}

  async subscribeUser(id: number, planDto: PlanDto): Promise<Plan> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existingUser)
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);

    if (existingUser.plan_balance < planDto.amount)
      throw new HttpException('Insufficient balance', HttpStatus.CONFLICT);

    existingUser.plan_balance -= planDto.amount;

    const plan = this.planRepository.create({
      ...planDto,
      user: { id },
    });

    await this.usersRepository.save(existingUser);
    const complete = await this.planRepository.save(plan);
    await this.trxService.createTrx(id, {
      service: 'Invested in plans',
      category: Category.Plan,
      amount: planDto.amount,
      status: TrxStatus.Successful,
    });

    return complete;
  }

  async getSubscribedUser(id: number): Promise<Plan[]> {
    const users_plan = await this.planRepository.find({
      where: { user: { id }, expired: false },
      order:{created_at:'DESC'}
    });

    const user = await this.usersRepository.findOne({ where: { id } });

    const validateEach = users_plan.filter(async (contract) => {
      const created_on = new Date(contract.created_at);
      const { roi } = contract;

      if (
        Date.now() >
        new Date(
          created_on.setDate(created_on.getDate() + contract.duration),
        ).getTime()
      ) {
        const pnl = contract.amount + (contract.amount * roi) / 100;
        contract.expired = true;
        user.plan_balance += pnl;

        await this.planRepository.save(contract);
        await this.usersRepository.save(user);
        await this.trxService.createTrx(id, {
          service: 'move PnL to plan account',
          amount: pnl,
          category: Category.Plan,
          status: TrxStatus.Successful,
        });

        return false;
      }

      return true;
    });

    return validateEach;
  }
}
