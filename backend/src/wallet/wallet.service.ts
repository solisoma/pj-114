/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { CreateWalletDto, UpdateWalletDto } from './dto/walletDto';
import { CryptoWallet } from '@app/typeorm/entities/bank.account.entity';
import { IWalletService } from './wallet';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CryptoWallet)
    private readonly walletRepository: Repository<CryptoWallet>,
  ) {}

  async createWallet(
    id: number,
    createWalletDto: CreateWalletDto,
  ): Promise<CryptoWallet> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existingUser)
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);

    const wallet = this.walletRepository.create({
      ...createWalletDto,
      user: { id },
    });

    return await this.walletRepository.save(wallet);
  }

  async getWallet(id: number): Promise<CryptoWallet[]> {
    return await this.walletRepository.find({
      where: { user: { id } },
      order: { created_at: 'DESC' },
    });
  }

  async updateWallet(details: UpdateWalletDto): Promise<CryptoWallet> {
    const wallet = await this.walletRepository.findOne({
      where: { id: details.id },
    });

    if (!wallet)
      throw new HttpException("Wallet doesn't exists", HttpStatus.CONFLICT);

    const updateWallet = { ...wallet, ...details };

    return await this.walletRepository.save(updateWallet);
  }

  async deleteWallet(id: number): Promise<{ id: number; deleted: boolean }> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: { id },
      });

      if (!wallet)
        throw new HttpException("Wallet doesn't exists", HttpStatus.CONFLICT);

      await this.walletRepository.softDelete(id);

      return { id, deleted: true };
    } catch {
      return { id, deleted: false };
    }
  }
}
