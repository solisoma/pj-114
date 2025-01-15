import React from "react";
import { MdAccountBalanceWallet } from "react-icons/md";

export default function Box({
  heading,
  desc,
}: {
  heading: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg w-full px-4 py-8 shadow-md bg-[#1E222D] md:py-[2rem]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-xm">{heading}</h2>
          <p className="font-bold text-xl">${desc}</p>
        </div>
        <div>
          <MdAccountBalanceWallet size={24} color="#0094FF" />
        </div>
      </div>
    </div>
  );
}
