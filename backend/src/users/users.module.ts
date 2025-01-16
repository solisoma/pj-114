/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Services } from 'src/utils/constants';
import { Transaction } from '@app/typeorm/entities/transaction.entity';
import { TransactionModule } from '@app/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction]),
    TransactionModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
  ],
  exports: [
    UsersService,
    TypeOrmModule,
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
