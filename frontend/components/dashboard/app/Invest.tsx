import React, { useState } from "react";
import PlanBox from "./PlanBox";
import { investmentPlans } from "@/utils/info";
import { User } from "../type";
import Modal from "../Modal";
import InvestModal from "./InvestModal";

export default function Invest({
  userDetail,
  setUser,
}: {
  userDetail?: User;
  setUser?: () => Promise<void>;
}) {
  const [showLogOut, setShowLogoOut] = useState(false);
  const [details, setDetails] = useState<(typeof investmentPlans)[0]>();

  function handleInvest(dets: (typeof investmentPlans)[0]) {
    setDetails(dets);
    setShowLogoOut(true);
  }

  return (
    <>
      <div className="flex flex-col gap-8">
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
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-2xl">Investment Plans</h2>
          <p className="text-sm w-[50%] text-center">
            Here is our several investment plans. You can invest daily, weekly
            or monthly and get higher returns in your investment.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-wrap md:flex-row md:gap-[1vw]">
          {investmentPlans.map((itm, i) => (
            <div key={i} className="w-full md:w-[32%]">
              <PlanBox
                plan={itm.plan}
                interest={itm.interestRate}
                days={String(itm.termDays)}
                min={itm.minDeposit}
                max={itm.maxDeposit}
                capReturn="Each Term"
                onInvest={() => {
                  handleInvest(itm);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        <InvestModal
          userDetail={userDetail!}
          details={details!}
          onPurchase={setUser!}
        />
      </Modal>
    </>
  );
}
