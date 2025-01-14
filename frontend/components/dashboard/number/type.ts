import React, { ReactNode } from "react";

export type HeaderWrapperProps = {
  header: string | React.JSX.Element;
  link?: string;
  text?: string;
  url?: string;
};
export type ContentPageProps = {
  children: ReactNode;
  flexType: string;
  height?: string;
  width: string;
  px?: string;
};

export interface InitialValueType {
  country: string;
  service: string;
  price: string | number;
  operator?: string;
  stock: number | string;
}

export interface ReqNumberType {
  country: string;
  service: string;
  price: string | number;
  operator?: string;
}

export type Provider = "lokimobile" | "hermes";
