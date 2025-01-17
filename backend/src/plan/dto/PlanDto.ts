/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlanDto {
  @ApiProperty({ example: '10' })
  @IsNumber()
  @IsNotEmpty()
  roi: number;

  @ApiProperty({ example: '1000' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '30' })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
