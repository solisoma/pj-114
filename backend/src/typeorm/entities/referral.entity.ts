/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Referral {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  host: User;

  @Column({ type: 'decimal', precision: 15, scale: 4 })
  profit: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
