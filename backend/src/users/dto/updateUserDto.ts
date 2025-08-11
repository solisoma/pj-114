/* eslint-disable prettier/prettier */
import { Country, Gender } from '@app/typeorm/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  picture?: string | null;

  @IsOptional()
  @IsEmail()
  phone_number: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @ApiProperty({ example: 'paymentSuccess' })
  @IsOptional()
  @IsString()
  paymentStatus?: string;
}

export class UpdatePnLDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  pnlId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
