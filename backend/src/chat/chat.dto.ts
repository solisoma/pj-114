/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChatDto {
  @IsNumber()
  @IsNotEmpty()
  readonly sender_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly recv_id: number;

  @IsString()
  @IsNotEmpty()
  readonly message: string;
}

export class ChatTypingDto {
  @IsNumber()
  @IsNotEmpty()
  readonly sender_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly recv_id: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isTyping: boolean;
}
