import { User } from './user.entity';
export declare enum TrxStatus {
    Failed = "failed",
    Pending = "pending",
    Reverse = "reverse",
    Successful = "successful"
}
export declare enum Category {
    Transfer = "transfer",
    Withdrawal = "withdrawal",
    Deposit = "deposit",
    CopyTrade = "copytrade",
    Plan = "plan",
    PNL = "PnL"
}
export declare class Transaction {
    id: number;
    user: User;
    category: Category;
    status: TrxStatus;
    service: string;
    proof: string;
    amount: number;
    created_at: Date;
}
