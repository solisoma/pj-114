/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';
import { UserStatus } from 'src/typeorm/entities/user.entity';
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

  @IsString()
  password?: string;

  provider?: AuthProvidersEnum;
  status?: UserStatus;
  socialId?: string | null;
  @IsOptional()
  referral_id?: string;

  hash?: string | null;
}
