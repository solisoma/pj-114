import { User } from './user.entity';
export declare class Plan {
    id: number;
    user: User;
    roi: number;
    duration: number;
    amount: number;
    expired: boolean;
    created_at: Date;
}
