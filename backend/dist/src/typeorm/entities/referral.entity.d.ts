import { User } from './user.entity';
export declare class Referral {
    id: number;
    user: User;
    host: User;
    profit: number;
    created_at: Date;
}
