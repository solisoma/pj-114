import React from "react";
import { IconType } from "react-icons/lib";

export interface ButtonType {
  text: string | React.JSX.Element;
  style: string;
  no_w?: boolean;
  type: string;
  url?: string;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonTextType {
  Icon: IconType;
  text: string;
  style?: string;
}

export interface FieldFnType {
  field: any;
  meta: any;
}
