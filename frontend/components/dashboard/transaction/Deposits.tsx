import React, { useEffect, useState } from "react";
import { TiArrowRightOutline } from "react-icons/ti";
import { GoArrowUpLeft } from "react-icons/go";
import { FaCreditCard } from "react-icons/fa";
import { User } from "../type";
import { MultiType } from "@/api/type";
import { get_Deposits } from "@/api/transactions";
import Modal from "../Modal";
import { Deposit } from "../Deposit";
import { TnxTable } from "../TnxTable";

export default function Deposits({ userDetail }: { userDetail: User }) {
  const [showLogOut, setShowLogoOut] = useState(false);
  const [transactions, setTransactions] = useState<MultiType[] | null>();

  async function getTrxs() {
    const trxs = await get_Deposits();
    setTransactions(trxs);
  }

  useEffect(() => {
    getTrxs();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
          <div>
            <p className="relative font-bold text-3xl text-black z-[10]">
              Deposit
            </p>
          </div>
          <div className="absolute h-[15rem] right-0 -bottom-2">
            <img src="/deposit.jpg" />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
            <h2 className="relative font-base text-xl">Available Balance</h2>
            <div>
              <div className="flex gap-2 justify-between">
                <h2 className="font-bold text-3xl">
                  ${Number(userDetail.balance)}
                </h2>
                <div>
                  <div className="rounded-full p-2 bg-[#10BD9D]">
                    <FaCreditCard size={24} className="w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <GoArrowUpLeft size={15} color="green" />
              </div>
            </div>
            <button
              onClick={() => setShowLogoOut(true)}
              className="flex gap-2 rounded-lg justify-center items-center bg-[#ECF2FF] px-4 py-2"
            >
              <p className="text-background2">Deposit Funds</p>
              <TiArrowRightOutline size={15} color="#0094FF" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Deposit</h2>
            <p className="text-sm">List of deposits in your account</p>
          </div>
          <TnxTable tableData={transactions || []} />
        </div>
      </div>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        <Deposit onPurchase={getTrxs} />
      </Modal>
    </>
  );
}
