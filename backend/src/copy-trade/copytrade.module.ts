/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CopyTradeService } from './copytrade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { TransactionModule } from '@app/transaction/transaction.module';
import { CopyTradeController } from './copytrade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionModule],
  controllers: [CopyTradeController],
  providers: [CopyTradeService],
  exports: [CopyTradeService],
})
export class CopyTradeModule {}
