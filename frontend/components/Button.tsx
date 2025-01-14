"use client";
import React from "react";
import Link from "next/link";
import { ButtonType } from "./type";

export default function Button({
  text,
  style,
  no_w,
  type,
  url,
  submit,
  disabled,
  onClick,
}: ButtonType): React.JSX.Element {
  const classStyle =
    type == "stroke"
      ? `text-[#034AA6] border-[1px] ${style}`
      : `text-white bg-gradient-to-r ${style}`;

  const handleClick = () => {
    if (onClick) onClick();
  };
  return submit ? (
    <button
      onClick={() => handleClick()}
      type="submit"
      disabled={disabled}
      className={`font-medium text-base ${
        !no_w && "w-full"
      } rounded-lg ${classStyle}`}
    >
      {text}
    </button>
  ) : (
    <Link
      onClick={() => handleClick()}
      href={url!}
      className={`font-medium text-base rounded-lg ${classStyle}`}
    >
      {text}
    </Link>
  );
}
