/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserPermission } from '@app/typeorm/entities/user.entity';
import { CreateWalletDto, UpdateWalletDto } from './dto/myWalletDto';
import { IWalletService } from './myWallet';
import { MyWallet } from '@app/typeorm/entities/wallet.entity';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(MyWallet)
    private readonly walletRepository: Repository<MyWallet>,
  ) {}

  async createWallet(
    id: number,
    createWalletDto: CreateWalletDto,
  ): Promise<MyWallet> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existingUser)
      throw new HttpException("User doesn't exists", HttpStatus.CONFLICT);

    if (existingUser.permission !== UserPermission.Admin)
      throw new HttpException(
        'User is not permitted to take this action',
        HttpStatus.CONFLICT,
      );

    const wallet = this.walletRepository.create({
      ...createWalletDto,
      user: { id },
    });

    return await this.walletRepository.save(wallet);
  }

  async getWallet(id: number, name: string): Promise<MyWallet> {
    return await this.walletRepository.findOne({
      where: { user: { id }, name },
    });
  }

  async updateWallet(id: number, details: UpdateWalletDto): Promise<MyWallet> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user.permission !== UserPermission.Admin)
      throw new HttpException(
        'User is not permitted to take this action',
        HttpStatus.CONFLICT,
      );

    const wallet = await this.walletRepository.findOne({
      where: { id: details.id },
    });

    if (!wallet)
      throw new HttpException("Wallet doesn't exists", HttpStatus.CONFLICT);

    const updateWallet = { ...wallet, ...details };

    return await this.walletRepository.save(updateWallet);
  }

  async deleteWallet(
    userId: number,
    id: number,
  ): Promise<{ id: number; deleted: boolean }> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (user.permission !== UserPermission.Admin)
        throw new HttpException(
          'User is not permitted to take this action',
          HttpStatus.CONFLICT,
        );

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
