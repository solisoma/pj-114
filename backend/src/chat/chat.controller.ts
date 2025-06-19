/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Routes } from '@app/utils/constants';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chat')
@UseGuards(AuthGuard('jwt'))
@Controller(Routes.Chat)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getChat(
    @Query('user1', ParseIntPipe) user1: number,
    @Query('user2', ParseIntPipe) user2: number,
  ) {
    return this.chatService.getChat(user1, user2);
  }

  @Get('recent/:userId')
  async getRecentChats(@Param('userId', ParseIntPipe) userId: number) {
    return this.chatService.getRecentChatPartners(userId);
  }
}
