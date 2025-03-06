import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './dto/walletDto';
import { CryptoWallet } from '@app/typeorm/entities/bank.account.entity';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createUser(createWalletDto: CreateWalletDto, req: any): Promise<CryptoWallet>;
    getWallet(req: any): Promise<CryptoWallet[]>;
    updateWallet(updateWallet: UpdateWalletDto): Promise<CryptoWallet>;
    deleteWallet(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
