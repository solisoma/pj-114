/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chat_sender, { onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => User, (user) => user.chat_recv, { onDelete: 'CASCADE' })
  recv: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;
}
