import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { LuLockKeyhole } from "react-icons/lu";
import { IoMdContacts } from "react-icons/io";
import { traders } from "@/utils/info";

export default function CopyBox({
  details,
  onInvest,
}: {
  details: (typeof traders)[0];
  onInvest: () => void;
}) {
  return (
    <div className="rounded-lg bg-[#1E222D] p-8">
      <div className="pb-6">
        <div className="rounded-full w-[3rem] h-[3rem] border-2 border-background2 p-1 md:w-[20%] md:h-[20%]">
          <img src="/copyImg.avif" className="h-full w-full rounded-full" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-semibold text-xl">{details.TraderDetails}</h2>
        <p className="text-sm">{details.StandaloneNumber}</p>
        <div className="flex gap-2">
          <p>Copy Guarantee</p>
          <IoMdCheckmarkCircle size={24} color="green" />
        </div>
        <button
          onClick={onInvest}
          className="flex gap-2 rounded-lg items-center bg-background2 px-8 py-2"
        >
          <p className="text-[.8rem] md:text-normal">
            COPY MASTER - {details.Days} days
          </p>
          <LuLockKeyhole size={15} />
        </button>
        <p className="text-sm">TitanTrust does not own this master.</p>
        <div className="flex flex-col justify-between w-full gap-4 text-sm md:flex-row">
          <div className="flex-1 flex justify-between">
            <p>ROI:</p>
            <p>{details.ROI}%</p>
          </div>
          <div className="flex-1 flex justify-between">
            <p>Accuracy</p>
            <p>{details.Accuracy}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-4 text-sm md:flex-row">
          <div className="flex-1 flex justify-between">
            <p>All Profits:</p>
            <p>{details.TotalProfit}</p>
          </div>
          <div className="flex-1 flex justify-between">
            <p>Copiers:</p>
            <div className="flex gap-2 items-center">
              <IoMdContacts size={24} color="purple" />
              <p>{details.Copiers}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-4 text-sm md:flex-row">
          <div className="flex-1 flex justify-between">
            <p>Min Fee</p>
            <p>{details.MinFee} USD</p>
          </div>
          <div className="flex-1 flex justify-between">
            <p>Account Type:</p>
            <p>Master</p>
          </div>
        </div>
      </div>
    </div>
  );
}
