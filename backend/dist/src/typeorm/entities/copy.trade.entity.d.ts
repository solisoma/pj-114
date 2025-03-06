import { User } from './user.entity';
export declare class CopyTrade {
    id: number;
    user: User;
    roi: number;
    amount: number;
    pnl: number;
    duration: number;
    expired: boolean;
    created_at: Date;
    last_update: Date;
}
