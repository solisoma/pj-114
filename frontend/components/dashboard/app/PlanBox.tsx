import React from "react";
import { LuLockKeyhole } from "react-icons/lu";

export default function PlanBox({
  plan,
  interest,
  days,
  min,
  max,
  capReturn,
  onInvest,
}: {
  plan: string;
  interest: string;
  days: string;
  min: number;
  max: number;
  capReturn: string;
  onInvest: () => void;
}) {
  return (
    <div className="flex flex-col rounded-lg w-full h-full">
      <div className="bg-[#FAFAFB] text-center rounded-tl-lg rounded-tr-lg py-2">
        <h2 className="text-black font-bold text-xl">{plan}</h2>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-br-lg rounded-bl-lg shadow-md px-6 py-4 shadow-[#1E222D] bg-[#1E222D]">
        <div className="flex justify-between w-[80%]">
          <div>
            <h2 className="font-bold text-2xl text-center">{interest}</h2>
            <p className="text-xm">interest</p>
          </div>
          <div>
            <h2 className="font-bold text-2xl text-center">{days}</h2>
            <p className="text-xm">Term Days</p>
          </div>
        </div>
        <div className="flex w-[90%] justify-between">
          <p>Min Deposit</p>
          <span>-</span>
          <p>{min} USD</p>
        </div>
        <div className="flex w-[90%] justify-between">
          <p>Max Deposit</p>
          <span>-</span>
          <p>{max} USD</p>
        </div>
        <div className="flex w-[90%] justify-between">
          <p>Capital Return</p>
          <span>-</span>
          <p>{capReturn}</p>
        </div>
        <div>
          <button
            onClick={onInvest}
            className="flex gap-2 rounded-lg items-center bg-background2 px-8 py-2"
          >
            <p>Invest Now</p>
            <LuLockKeyhole size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
