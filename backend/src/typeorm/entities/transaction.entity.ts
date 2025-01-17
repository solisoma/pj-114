/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum TrxStatus {
  Failed = 'failed',
  Pending = 'pending',
  Reverse = 'reverse',
  Successful = 'successful',
}

export enum Category {
  Transfer = 'transfer',
  Withdrawal = 'withdrawal',
  Deposit = 'deposit',
  CopyTrade = 'copytrade',
  Plan = 'plan',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ type: 'enum', enum: TrxStatus, default: TrxStatus.Pending })
  status: TrxStatus;

  @Column({ type: String })
  service: string;

  @Column({ type: String, nullable: true })
  proof: string;

  @Column({ type: 'decimal', precision: 15, scale: 4 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
