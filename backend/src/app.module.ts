/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './config/database.config';
import { DatabaseInitializerService } from './database/database-initializer.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import authConfig from './config/auth.config';
import { EncryptModule } from './encrypt/encrypt.module';
import { CopyTradeModule } from './copy-trade/copytrade.module';
import { PlanModule } from './plan/plan.module';
import { TransactionModule } from './transaction/transaction.module';
import { UploadModule } from './upload/upload.module';
import { WalletModule } from './wallet/wallet.module';
import { MyWalletModule } from './my-wallet/myWallet.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AuthModule,
    UsersModule,
    EncryptModule,
    CopyTradeModule,
    PlanModule,
    TransactionModule,
    UploadModule,
    WalletModule,
    MyWalletModule,
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [DatabaseInitializerService, AppService],
})
export class AppModule {}
