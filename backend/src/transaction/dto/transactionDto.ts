/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category, TrxStatus } from '@app/typeorm/entities/transaction.entity';

export class CreateTrxDto {
  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TrxStatus)
  @IsOptional()
  status?: TrxStatus;
}

export class UpdateTrxDto {
  @IsEnum(TrxStatus)
  @IsNotEmpty()
  status: TrxStatus;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
