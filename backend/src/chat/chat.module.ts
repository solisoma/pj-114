/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { Chat } from '@app/typeorm/entities/chat.entity';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
