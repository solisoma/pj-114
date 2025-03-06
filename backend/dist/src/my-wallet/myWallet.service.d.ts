import { Repository } from 'typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { CreateWalletDto, UpdateWalletDto } from './dto/myWalletDto';
import { IWalletService } from './myWallet';
import { MyWallet } from '@app/typeorm/entities/wallet.entity';
export declare class WalletService implements IWalletService {
    private readonly usersRepository;
    private readonly walletRepository;
    constructor(usersRepository: Repository<User>, walletRepository: Repository<MyWallet>);
    createWallet(id: number, createWalletDto: CreateWalletDto): Promise<MyWallet>;
    getWallet(name: string): Promise<MyWallet>;
    getAllWallet(): Promise<MyWallet[]>;
    updateWallet(id: number, details: UpdateWalletDto): Promise<MyWallet>;
    deleteWallet(userId: number, id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
