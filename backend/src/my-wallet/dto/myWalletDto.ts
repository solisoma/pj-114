/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ example: 'USDT(TRC20)' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'My wallet' })
  @IsString()
  @IsOptional()
  qrcode?: string;

  @ApiProperty({ example: '24467hb5yh7uhb56ey7u76jh7u8i6u979km9k7' })
  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateWalletDto {
  @ApiProperty({ example: '12' })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'USDT(TRC20)' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'My wallet' })
  @IsString()
  @IsOptional()
  qrcode?: string;

  @ApiProperty({ example: '24467hb5yh7uhb56ey7u76jh7u8i6u979km9k7' })
  @IsString()
  @IsOptional()
  address?: string;
}

export class GetWalletDto {
  @ApiProperty({ example: 'My wallet' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
