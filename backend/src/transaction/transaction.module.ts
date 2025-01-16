/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { Transaction } from '@app/typeorm/entities/transaction.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Transaction])],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
