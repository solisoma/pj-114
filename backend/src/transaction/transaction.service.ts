/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { CreateTrxDto, UpdateTrxDto } from './dto/transactionDto';
import { Transaction } from '@app/typeorm/entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trxRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createTrx(
    id: number,
    createTrxDto: CreateTrxDto,
  ): Promise<Transaction> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!existingUser)
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);

    const trx = this.trxRepository.create({ ...createTrxDto, user: { id } });
    return this.trxRepository.save(trx);
  }

  async updateTrx(
    id: number,
    updateTrxDto: UpdateTrxDto,
  ): Promise<Transaction> {
    // check if it exists
    const existingTrx = await this.trxRepository.findOne({
      where: { id },
    });
    if (!existingTrx)
      throw new HttpException(
        "Transaction doesn't exists",
        HttpStatus.CONFLICT,
      );

    await this.trxRepository.update(id, updateTrxDto);
    return await this.trxRepository.findOne({
      where: { id },
    });
  }
}
