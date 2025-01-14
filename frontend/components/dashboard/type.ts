import React from "react";

export interface ScaffoldType {
  children: React.JSX.Element;
  activeLink: string;
  route: (param: string) => void;
}

export interface User {
  [name: string]: any;
}

export interface ModalType {
  children: React.JSX.Element;
  show: boolean;
  classes?: string;
  setShow: (param: boolean) => void;
  onClose?: () => void;
}

export interface ModalType2 {
  children: React.JSX.Element;
  visible: boolean;
  styleString?: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  size?: number;
}

export interface LogOutActionType {
  closeModal?: () => void;
  onLogOut?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onPurchase?: () => Promise<void>;
  onAction?: (...arg: any) => Promise<void>;
}

export interface PopUpType {
  children: React.JSX.Element;
  id: number;
  currentId: number;
  above: boolean;
}
