/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';
import { Country, Gender, UserStatus } from 'src/typeorm/entities/user.entity';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'Ufere Goodnews' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  phone_number: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  address: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsString()
  password?: string;

  provider?: AuthProvidersEnum;
  status?: UserStatus;
  socialId?: string | null;

  @IsOptional()
  referral_id?: string;

  hash?: string | null;
}
