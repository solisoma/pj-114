/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TrxStatus } from '@app/typeorm/entities/transaction.entity';

export class CreateTrxDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class UpdateTrxDto {
  @IsEnum(TrxStatus)
  @IsNotEmpty()
  status: TrxStatus;
}
