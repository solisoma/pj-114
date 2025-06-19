/* eslint-disable prettier/prettier */
import { Chat } from '@app/typeorm/entities/chat.entity';
import { User } from '@app/typeorm/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatDto } from './chat.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async getChat(id1: number, id2: number): Promise<Chat[]> {
    const sender = await this.userRepository.findOne({ where: { id: id1 } });
    if (!sender) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    const recv = await this.userRepository.findOne({ where: { id: id2 } });
    if (!recv) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    const chats = await this.chatRepository.find({
      where: [
        { sender: { id: id1 }, recv: { id: id2 } },
        { sender: { id: id2 }, recv: { id: id1 } },
      ],
      order: {
        sentAt: 'ASC',
      },
      relations: ['sender', 'recv'], // optional: if you want to include full user data
    });

    return chats;
  }

  async saveChat(dto: ChatDto): Promise<Chat> {
    const sender_exist = await this.userRepository.findOne({
      where: { id: dto.sender_id },
    });

    if (!sender_exist)
      throw new HttpException('Sender doesnt exist', HttpStatus.NOT_FOUND);

    const recv_exist = await this.userRepository.findOne({
      where: { id: dto.recv_id },
    });

    if (!recv_exist)
      throw new HttpException('Sender doesnt exist', HttpStatus.NOT_FOUND);

    const chat = this.chatRepository.create({
      sender: { id: dto.sender_id },
      recv: { id: dto.recv_id },
      message: dto.message,
    });

    return await this.chatRepository.save(chat);
  }

  async getRecentChatPartners(userId: number): Promise<
    {
      partner: User;
      lastMessage: string;
      sentAt: Date;
    }[]
  > {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    const rawResults = await this.chatRepository.query(
      `
    SELECT 
      c.chat_id,
      c.last_message,
      c.sent_at,
      c.sender_id,
      c.recv_id,
      c.sender_user_id,
      c.sender_name,
      c.receiver_user_id,
      c.receiver_name
    FROM (
      SELECT 
        chat.id AS chat_id,
        chat.message AS last_message,
        chat."sentAt" AS sent_at,
        chat."senderId" AS sender_id,
        chat."recvId" AS recv_id,
        sender.id AS sender_user_id,
        sender.name AS sender_name,
        receiver.id AS receiver_user_id,
        receiver.name AS receiver_name,
        ROW_NUMBER() OVER (
          PARTITION BY LEAST(chat."senderId", chat."recvId"), GREATEST(chat."senderId", chat."recvId")
          ORDER BY chat."sentAt" DESC, chat.id DESC
        ) AS rn
      FROM chat
      LEFT JOIN "user" sender ON chat."senderId" = sender.id
      LEFT JOIN "user" receiver ON chat."recvId" = receiver.id
      WHERE chat."senderId" = $1 OR chat."recvId" = $1
    ) c
    WHERE c.rn = 1
    ORDER BY c.sent_at DESC
  `,
      [userId],
    );

    return rawResults.map((row: any) => ({
      partner: {
        id:
          row.sender_id === userId ? row.receiver_user_id : row.sender_user_id,
        name: row.sender_id === userId ? row.receiver_name : row.sender_name,
        // Add other User fields as needed
      },
      lastMessage: row.last_message,
      sentAt: new Date(row.sent_at),
    }));
  }
}
