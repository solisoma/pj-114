/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { WalletController } from './myWallet.controller';
import { WalletService } from './myWallet.service';
import { UploadModule } from '@app/upload/upload.module';
import { MyWallet } from '@app/typeorm/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MyWallet]), UploadModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class MyWalletModule {}
