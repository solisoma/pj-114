export declare enum Actions {
    Suspend = "suspend",
    Activate = "activate",
    Delete = "delete",
    ToAdmin = "to-admin",
    ToUser = "to-user",
    Verify = "verify",
    NotVerify = "not-verify"
}
export declare enum TrxCategory {
    All = "all",
    Withdrawal = "withdrawal",
    Deposit = "deposit"
}
export declare enum Directions {
    Send = "send",
    Receive = "receive"
}
export declare class adminChangeUserStatusDto {
    userId: number;
    action: Actions;
}
export declare class transcDetailsDto {
    userId: number;
    pnl: boolean;
    amount: number;
    direction: Directions;
}
export declare class IdDto {
    userId: string;
    category: TrxCategory;
}
export declare class UserDto {
    userId: string;
}
export declare class TransferDto {
    from: string;
    to: string;
    amount: number;
}
export declare class DepositDto {
    amount: number;
    walletAddress?: string;
}
export declare class KycDto {
    front?: string;
    back?: string;
}
export declare class ProofDto {
    id?: number;
    file?: string;
}
