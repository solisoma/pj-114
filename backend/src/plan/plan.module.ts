/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { TransactionModule } from '@app/transaction/transaction.module';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionModule],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
