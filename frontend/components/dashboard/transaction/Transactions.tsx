import React from "react";
import { TbHomeDollar } from "react-icons/tb";
import { InvTable } from "../InvTable";
import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5";

export default function Transactions() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
        <div>
          <p className="relative font-bold text-3xl text-black z-[10]">
            Transactions
          </p>
        </div>
        <div className="absolute h-[15rem] right-0 -bottom-2">
          <img src="/trx.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-4 py-8 md:flex-row md:justify-between">
        <div>
          <h2 className="font-semibold text-2xl">Transaction History</h2>
          <p className="text-sm">List of transactions in your account</p>
        </div>
        <div>
          <button className="flex gap-2 rounded-lg items-center bg-background2 px-4 py-2">
            <TbHomeDollar size={20} />
            <p>Deposit</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <button className="flex-1 flex gap-2 justify-center rounded-lg bg-background2 py-1">
          <IoArrowDownCircle size={24} />
          <p>Deposits</p>
        </button>
        <button className="flex-1 flex gap-2 justify-center rounded-lg py-1">
          <IoArrowUpCircle size={24} />
          <p>Withdrawals</p>
        </button>
      </div>
      <InvTable tableData={[]} />
    </div>
  );
}
