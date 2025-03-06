import { Repository } from 'typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { CreateWalletDto, UpdateWalletDto } from './dto/walletDto';
import { CryptoWallet } from '@app/typeorm/entities/bank.account.entity';
import { IWalletService } from './wallet';
export declare class WalletService implements IWalletService {
    private readonly usersRepository;
    private readonly walletRepository;
    constructor(usersRepository: Repository<User>, walletRepository: Repository<CryptoWallet>);
    createWallet(id: number, createWalletDto: CreateWalletDto): Promise<CryptoWallet>;
    getWallet(id: number): Promise<CryptoWallet[]>;
    updateWallet(details: UpdateWalletDto): Promise<CryptoWallet>;
    deleteWallet(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
