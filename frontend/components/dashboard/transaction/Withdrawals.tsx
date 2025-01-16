import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { TiArrowRightOutline } from "react-icons/ti";
import { GoArrowUpLeft } from "react-icons/go";
import { InvTable } from "../InvTable";
import { FaGift } from "react-icons/fa6";

export default function Withdrawals() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
        <div>
          <p className="relative font-bold text-3xl text-black z-[10]">
            Withdrawal
          </p>
        </div>
        <div className="absolute h-[15rem] right-0 -bottom-2">
          <img src="/user.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
          <h2 className="relative font-base text-xl">Available Balance</h2>
          <div>
            <div className="flex gap-2 justify-between">
              <h2 className="font-bold text-3xl">$0</h2>
              <div>
                <div className="rounded-full p-2 bg-[#10BD9D]">
                  <FaCreditCard size={24} className="w-full h-full" />
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <GoArrowUpLeft size={15} color="green" />
              <p>0 USD</p>
            </div>
          </div>
          <button className="flex gap-2 rounded-lg justify-center items-center bg-[#ECF2FF] px-4 py-2">
            <p className="text-background2">Request Withdrawal</p>
            <TiArrowRightOutline size={15} color="#0094FF" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
          <h2 className="relative font-base text-xl">Referral Bonus</h2>
          <div>
            <div className="flex gap-2 justify-between">
              <h2 className="font-bold text-3xl">$0</h2>
              <div>
                <div className="rounded-full p-2 bg-[#D5745B]">
                  <FaGift
                    size={24}
                    color="#D5745BD5745B"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <GoArrowUpLeft size={15} color="green" />
              <p>0 USD</p>
            </div>
          </div>
          <button className="flex gap-2 rounded-lg justify-center items-center bg-[#D5745B] px-4 py-2">
            <p className="text-white">Request Withdrawal</p>
            <TiArrowRightOutline size={15} color="white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl">Withdrawal</h2>
          <p className="text-sm">List of withdrawals in your account</p>
        </div>
        <InvTable tableData={[]} />
      </div>
    </div>
  );
}
