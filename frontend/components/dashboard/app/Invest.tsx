import React from "react";
import PlanBox from "./PlanBox";

export default function Invest() {
  return (
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
          Here is our several investment plans. You can invest daily, weekly or
          monthly and get higher returns in your investment.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-wrap md:flex-row">
        <div className="w-full md:w-[32%]">
          <PlanBox />
        </div>
        <div className="w-full md:w-[32%]">
          <PlanBox />
        </div>
        <div className="w-full md:w-[32%]">
          <PlanBox />
        </div>
        <div className="w-full md:w-[32%]">
          <PlanBox />
        </div>
        <div className="w-full md:w-[32%]">
          <PlanBox />
        </div>
      </div>
    </div>
  );
}
