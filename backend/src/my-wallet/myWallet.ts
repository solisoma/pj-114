/* eslint-disable prettier/prettier */
import { MyWallet } from '@app/typeorm/entities/wallet.entity';
import { CreateWalletDto, UpdateWalletDto } from './dto/myWalletDto';

export interface IWalletService {
  createWallet(id: number, createWalletDto: CreateWalletDto): Promise<MyWallet>;
  getWallet(id: number, name: string): Promise<MyWallet>;
  updateWallet(id: number, details: UpdateWalletDto): Promise<MyWallet>;
  deleteWallet(
    userId: number,
    id: number,
  ): Promise<{ id: number; deleted: boolean }>;
}
