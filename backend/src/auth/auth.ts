/* eslint-disable prettier/prettier */
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { LoginResponseType } from './types/login-response.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { User } from 'src/typeorm/entities/user.entity';

export interface IAuthService {
  validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
  registerUser(registerDto: AuthRegisterDto): Promise<void>;
  // handleOAuthCallback(code: string): Promise<LoginResponseType>;
  status(
    userJwtPayload: JwtPayloadType,
  ): Promise<
    NullableType<User | { totalDeposits: number; totalWithdrawals: number }>
  >;
  confirmEmail(hash: string): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(hash: string, password: string): Promise<void>;
  refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>>;
  encryptToken(): Promise<string>;
  logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>): any;
}
