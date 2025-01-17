/* eslint-disable prettier/prettier */
import { NullableType } from '@app/utils/types/nullable.type';
import { User } from 'src/typeorm/entities/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

export interface NewUser extends NullableType<User> {
  totalDeposits: number;
  totalWithdrawals: number;
}
