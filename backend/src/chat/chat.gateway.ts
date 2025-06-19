/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // Use Socket, not WebSocket
import { ChatService } from './chat.service';
import { Cors } from '@app/utils/constants';
import { ChatDto, ChatTypingDto } from './chat.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' ? Cors.prodCor : Cors.devCor, // Or restrict to frontend domain in production
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private userSockets: Map<number, Socket[]> = new Map();

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized ', server.sockets.sockets);
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.auth.id;
    client.data.id = userId;

    // get or create array
    const sockets = this.userSockets.get(userId) || [];
    sockets.push(client);
    this.userSockets.set(userId, sockets);
    console.log(`User ${userId} connected. Total sockets: ${sockets.length}`);
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.id;
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      // Remove the disconnected socket
      this.userSockets.set(
        userId,
        sockets.filter((sock) => sock.id !== client.id),
      );
      // Optional: delete the key if no sockets left
      if (this.userSockets.get(userId)?.length === 0) {
        this.userSockets.delete(userId);
      }
      console.log(
        `User ${userId} disconnected. Remaining sockets: ${this.userSockets.get(userId)?.length || 0}`,
      );
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: ChatDto): Promise<void> {
    try {
      const newChat = await this.chatService.saveChat(message);

      const recvSockets = this.userSockets.get(message.recv_id);

      if (recvSockets && recvSockets.length > 0) {
        recvSockets.forEach((sock) => {
          sock.emit('message', newChat);
        });
      }

      // notify sender
      const senderSockets = this.userSockets.get(message.sender_id);

      if (senderSockets && senderSockets.length > 0) {
        senderSockets.forEach((sock) => {
          sock.emit('notification', 'sent');
        });
      }
    } catch {
      // notify sender
      const senderSockets = this.userSockets.get(message.sender_id);

      if (senderSockets && senderSockets.length > 0) {
        senderSockets.forEach((sock) => {
          sock.emit('notification', 'not sent');
        });
      }
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody()
    message: ChatTypingDto,
  ): void {
    const receiverSockets = this.userSockets.get(message.recv_id);
    if (receiverSockets && receiverSockets.length > 0) {
      receiverSockets.forEach((sock) => {
        sock.emit('typing', message);
      });
    }
  }
}
