/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Country, Gender } from '@app/typeorm/entities/user.entity';

export class AuthRegisterDto {
  @ApiProperty({ example: 'uferegoodnews@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Ufere Goodnews' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Ufere Goodnews' })
  @IsOptional()
  @IsString()
  referral_id?: string;

  @ApiProperty({ example: 'Ufere Goodnews' })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: '234 Ava street' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'USA' })
  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @ApiProperty({ example: 'Male' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
