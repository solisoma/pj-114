/* eslint-disable prettier/prettier */
import { CreateWalletDto, UpdateWalletDto } from './dto/walletDto';
import { CryptoWallet } from '@app/typeorm/entities/bank.account.entity';

export interface IWalletService {
  createWallet(
    id: number,
    createWalletDto: CreateWalletDto,
  ): Promise<CryptoWallet>;
  getWallet(id: number): Promise<CryptoWallet[]>;
  updateWallet(details: UpdateWalletDto): Promise<CreateWalletDto>;
  deleteWallet(id: number): Promise<{ id: number; deleted: boolean }>;
}
