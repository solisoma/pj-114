/* eslint-disable prettier/prettier */
import { Country, Gender } from '@app/typeorm/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateUserDto {
  @ApiProperty({ example: 'Ufere Goodnews' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiProperty({ example: 'goodnews1234@@!' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'https://example.com/picture.jpg' })
  @IsOptional()
  @IsString()
  picture?: string | null;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsOptional()
  @IsEmail()
  phone_number: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsOptional()
  @IsEmail()
  address: string;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 'dekalusha@gmail.com' })
  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @ApiProperty({ example: 'paymentSuccess' })
  @IsOptional()
  @IsString()
  paymentStatus?: string;
}
