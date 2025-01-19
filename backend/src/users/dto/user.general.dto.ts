/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Actions {
  Suspend = 'suspend',
  Activate = 'activate',
  Delete = 'delete',
  ToAdmin = 'to-admin',
  ToUser = 'to-user',
  Verify = 'verify',
  NotVerify = 'not-verify',
}

export enum TrxCategory {
  All = 'all',
  Withdrawal = 'withdrawal',
  Deposit = 'deposit',
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
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsEnum(TrxCategory)
  category: TrxCategory;
}

export class UserDto {
  @IsString()
  @IsOptional()
  userId: string;
}

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class DepositDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class KycDto {
  @IsOptional()
  @IsString()
  front?: string;

  @IsOptional()
  @IsString()
  back?: string;
}

export class ProofDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  file?: string;
}
