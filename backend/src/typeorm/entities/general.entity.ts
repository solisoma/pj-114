/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class General {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  wallet_address: string;

  @Column({ type: Boolean })
  allow_kyc: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
