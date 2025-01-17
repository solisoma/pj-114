/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CopyTradeService } from './copytrade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { TransactionModule } from '@app/transaction/transaction.module';
import { CopyTradeController } from './copytrade.controller';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CopyTrade]), TransactionModule],
  controllers: [CopyTradeController],
  providers: [CopyTradeService],
  exports: [CopyTradeService],
})
export class CopyTradeModule {}
