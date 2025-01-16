/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

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
}
