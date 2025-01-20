import React, { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { TbHomeDollar } from "react-icons/tb";
import { TiArrowRightOutline } from "react-icons/ti";
import { TfiBarChart } from "react-icons/tfi";
import { InvTable } from "../InvTable";
import Modal from "../Modal";
import { Deposit } from "../Deposit";
import { Withdraw } from "../Withdraw";
import { User } from "../type";
import { MultiType } from "@/api/type";
import Transfer from "../Transfer";
import { get_investment } from "@/api/app";

export default function Investment({
  userDetail,
  setUser,
}: {
  userDetail?: User;
  setUser?: () => void;
}) {
  const [showLogOut, setShowLogoOut] = useState(false);
  const [transactions, setTransactions] = useState<MultiType[] | null>();
  const [action, setAction] = useState("deposit");
  const [gained, setGained] = useState<number>(0);

  async function getTrxs() {
    // do nothing
  }

  async function onClose() {
    const inv = await get_investment();
    setTransactions(inv);
  }

  function totalProfit() {
    if (transactions) {
      const gain = transactions
        .map((itm) => (Number(itm.roi) * itm.amount) / 100)
        .reduce((a, b) => a + b, 0);
      setGained(gain);
    }
  }

  useEffect(() => totalProfit, [transactions]);

  useEffect(() => {
    onClose();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
          <div>
            <p className="relative font-bold text-3xl text-black z-[10]">
              Investment
            </p>
          </div>
          <div className="absolute h-[15rem] right-0 -bottom-2">
            <img src="/investment.jpg" />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 md:flex-row md:justify-between">
          <div>
            <h2 className="font-semibold text-2xl">Invested Plans</h2>
            <p className="text-sm">At a glance summary of your investment</p>
          </div>
          <div className="flex gap-4 md:gap-6">
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
            <div>
              <button
                onClick={() => {
                  setAction("withdraw");
                  setShowLogoOut(true);
                }}
                className="flex gap-2 rounded-lg items-center bg-[#10BD9D] px-4 py-2"
              >
                <FaCreditCard size={20} color="" />
                <p>Withdraw</p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D] md:w-[30%]">
            <h2 className="relative font-base text-xl">Investment Account</h2>
            <div>
              <h2>{Number(userDetail!.plan_balance)} USD</h2>
              <p>Balance</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setAction("transfer");
                  setShowLogoOut(true);
                }}
                className="flex gap-2 rounded-lg items-center bg-[#ECF2FF] px-4 py-2"
              >
                <p className="text-background2">Transfer Funds</p>
                <TiArrowRightOutline size={15} color="#0094FF" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center rounded-lg p-8 w-full bg-[#1E222D] md:w-[70%]">
            <div className="flex flex-col gap-4 ">
              <h2 className="relative font-base text-xl">Investment Account</h2>
              <div>
                <h2>{Number(gained)} USD</h2>
                <p>Unrealized PnL</p>
              </div>
            </div>
            <TfiBarChart size={100} color="#0094FF" />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Ongoing Investment</h2>
            <p className="text-sm">
              List of ongoing investments in your account
            </p>
          </div>
          <InvTable tableData={transactions || []} />
        </div>
      </div>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        {action === "deposit" ? (
          <Deposit onPurchase={getTrxs} />
        ) : action === "withdraw" ? (
          <Withdraw onAction={getTrxs} balance={userDetail!.balance} />
        ) : (
          <Transfer
            userDetail={userDetail!}
            setUser={setUser!}
            onAction={onClose}
          />
        )}
      </Modal>
    </>
  );
}
