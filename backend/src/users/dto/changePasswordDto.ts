/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: 'goodnews123' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'goodnews123' })
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}
