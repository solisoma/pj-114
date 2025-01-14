import React from "react";
import { IconType } from "react-icons";

export default function BoxOne({
  bg,
  Icon,
  icnColor,
  heading,
  desc,
}: {
  bg?: string;
  icnColor?: string;
  Icon: IconType;
  desc: string;
  heading: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg ${
        bg ?? "bg-gradient-to-br from-[#202228] to-[#131418]"
      } min-h-[35vh] h-full p-[2rem]`}
    >
      {Icon && <Icon size={24} color={icnColor ?? "#038CEF"} />}
      <div>
        <h2 className="font-bold text-3xl">{heading}</h2>
        <p className="text-[#9CB0C2]">{desc}</p>
      </div>
    </div>
  );
}
