/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum TrxStatus {
  Failed = 'failed',
  Pending = 'pending',
  Reverse = 'reverse',
  Successful = 'successful',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: TrxStatus, default: TrxStatus.Successful })
  status: TrxStatus;

  @Column({ type: String })
  service: string;

  @Column({ type: 'decimal', precision: 15, scale: 4 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
