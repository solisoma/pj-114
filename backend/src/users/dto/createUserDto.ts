/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate } from 'class-validator';
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
  picture?: string | null;

  hash?: string | null;

  @ApiProperty({ example: new Date().toISOString() })
  @IsDate()
  @Type(() => Date)
  activationExpiry?: Date;
}
