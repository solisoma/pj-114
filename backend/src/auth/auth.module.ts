/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { ForgotPasswordModule } from 'src/forgot-password/forgot-password.module';
// import { GoogleStrategy } from './strategies/google-strategy';
import { SessionSerializer } from './strategies/serializer';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { Transaction } from '@app/typeorm/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from '@app/typeorm/entities/referral.entity';

@Module({
  imports: [
    UsersModule,
    SessionModule,
    PassportModule.register({ session: true }),
    ForgotPasswordModule,
    JwtModule.register({}),
    EncryptModule,
    TypeOrmModule.forFeature([Transaction, Referral]),
  ],

  controllers: [AuthController],
  providers: [
    JwtRefreshStrategy,
    JwtStrategy,
    AnonymousStrategy,
    // GoogleStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    {
      provide: Services.AUTH_GOOGLE,
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    {
      provide: Services.AUTH_GOOGLE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
