/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Actions {
  Suspend = 'suspend',
  Activate = 'activate',
  Delete = 'delete',
  ToAdmin = 'to-admin',
  ToUser = 'to-user',
}

export enum Directions {
  Send = 'send',
  Receive = 'receive',
}

export class adminChangeUserStatusDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(Actions)
  @IsNotEmpty()
  action: Actions;
}

export class transcDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Directions)
  @IsNotEmpty()
  direction: Directions;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
