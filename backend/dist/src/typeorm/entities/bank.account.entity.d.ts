import { User } from './user.entity';
export declare class CryptoWallet {
    id: number;
    user: User;
    name: string;
    address: string;
    label: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
