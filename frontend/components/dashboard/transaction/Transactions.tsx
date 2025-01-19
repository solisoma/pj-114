import React, { useEffect, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { TnxTable } from "../TnxTable";
import { get_trxs } from "@/api/transactions";
import { MultiType } from "@/api/type";
import Modal from "../Modal";
import { Deposit } from "../Deposit";
import { Withdraw } from "../Withdraw";
import { User } from "../type";

export default function Transactions({ userDetail }: { userDetail?: User }) {
  const [transactions, setTransactions] = useState<MultiType[] | null>();
  const [showLogOut, setShowLogoOut] = useState(false);
  const [action, setAction] = useState("deposit");

  async function getTrxs() {
    const trxs = await get_trxs(true);
    setTransactions(trxs);
  }

  useEffect(() => {
    getTrxs(); // Get transactions
  }, []);

  return (
    <>
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
            <button
              onClick={() => {
                setAction("deposit");
                setShowLogoOut(true);
              }}
              className="flex gap-2 rounded-lg items-center bg-background2 px-4 py-2"
            >
              <TbHomeDollar size={20} />
              <p>Deposit</p>
            </button>
          </div>
        </div>
        <TnxTable tableData={transactions || []} />
      </div>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        {action === "deposit" ? (
          <Deposit />
        ) : (
          <Withdraw onAction={getTrxs} balance={userDetail!.balance} />
        )}
      </Modal>
    </>
  );
}
