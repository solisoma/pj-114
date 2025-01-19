type FunctionOrNull<T = void> = (...args: any[]) => T;

type FunctionList<T = void> = FunctionOrNull<T>[];

export enum Actions {
  Suspend = "suspend",
  Activate = "activate",
  Delete = "delete",
  ToAdmin = "to-admin",
  ToUser = "to-user",
  Verify = "verify",
  NotVerify = "not-verify",
}

export interface SignUpMessageType {
  Conflict?: string;
  "Not Found"?: string;
  [key: string]: any;
}

export interface MultiType {
  [name: string]: any;
}

export interface ChangePasswordType {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export enum SignUpMessageEnum {
  Conflict = "Conflict",
  "Not Found" = "Not Found",
}

export interface ListenerArrayType {
  [name: string]: FunctionList;
}

export interface IActiveTrade {
  length: number;
  percent: number;
}

export interface InfoType {
  cost: number;
  count: number;
}

export interface UpdateBalanceType {
  userId: number;
  amount: number;
  direction: string;
}

export interface ChangeUserStatusType {
  userId: number;
  action: Actions;
}
