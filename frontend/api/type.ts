import { Provider } from "@/components/dashboard/number/type";

type FunctionOrNull<T = void> = (...args: any[]) => T;

type FunctionList<T = void> = FunctionOrNull<T>[];

export enum Actions {
  Suspend = "suspend",
  Activate = "activate",
  Delete = "delete",
  ToAdmin = "to-admin",
  ToUser = "to-user",
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

export interface NumberType {
  id: number;
  activation_id: string;
  phone_number: string;
  code: number;
  country: string;
  service: string;
  status: string;
  resend: boolean;
  cost: number;
  provider: Provider;
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
