/* eslint-disable prettier/prettier */
import { User } from 'src/typeorm/entities/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
