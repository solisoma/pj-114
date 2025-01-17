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
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  file?: string;
}
