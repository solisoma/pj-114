import { WalletService } from './myWallet.service';
import { CreateWalletDto, GetWalletDto, UpdateWalletDto } from './dto/myWalletDto';
import { MyWallet } from '@app/typeorm/entities/wallet.entity';
import { UploadService } from '@app/upload/upload.service';
export declare class WalletController {
    private readonly walletService;
    private readonly uploadService;
    constructor(walletService: WalletService, uploadService: UploadService);
    createUser(createWalletDto: CreateWalletDto, req: any, res: any): Promise<MyWallet>;
    getWallet(param: GetWalletDto): Promise<MyWallet>;
    getAllWallet(): Promise<MyWallet[]>;
    updateWallet(updateWallet: UpdateWalletDto, req: any, res: any): Promise<MyWallet>;
    deleteWallet(id: number, req: any): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
