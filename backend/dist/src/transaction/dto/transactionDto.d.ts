import { Category, TrxStatus } from '@app/typeorm/entities/transaction.entity';
export declare class CreateTrxDto {
    category: Category;
    service: string;
    amount: number;
    walletAddress?: string;
    status?: TrxStatus;
}
export declare class UpdateTrxDto {
    status: TrxStatus;
    id: number;
}
