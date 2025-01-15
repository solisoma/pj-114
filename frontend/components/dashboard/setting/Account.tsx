import React from "react";
import Frame from "./Frame";
import { TbBuildingBank } from "react-icons/tb";

export default function Account() {
  return (
    <Frame>
      <>
        <div className="flex flex-col py-8 px-6 gap-4 rounded-lg bg-[#1E222D] md:flex-row md:justify-between md:gap-0">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">KYC Verification</h2>
            <p className="text-red-700 text-xm">
              Note: You have to complete your KYC Verification to access
              withdrawals
            </p>
          </div>
          <div className="flex items-center">
            <button className="px-6 py-2 rounded-lg bg-background2">
              Verify
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 px-6 md:flex-row md:justify-between md:gap-0">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Your Accounts</h2>
            <p className="text-xm">
              Below are your saved accounts that you can withdraw your funds to.
            </p>
          </div>
          <div className="flex items-center">
            <button className="px-6 py-2 rounded-lg bg-background2">
              Add Account
            </button>
          </div>
        </div>
        <div className="flex flex-col py-8 px-6 gap-4 rounded-lg bg-[#1E222D] md:flex-row md:justify-between md:gap-0">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-[1rem]">
              Bank Account (ACC-78704)
            </h2>
            <div className="flex gap-4 items-center">
              <TbBuildingBank size={24} />
              <div>
                <h2 className="font-bold">gt4g4g, fgergt</h2>
                <p className="text-sm">kl k (3446*****5)</p>
              </div>
            </div>
            <button className="px-6 py-2 rounded-lg border border-[#FA896B] hover:bg-yellow-600">
              Delete
            </button>
          </div>
          <div className="flex items-center">
            <button className="px-6 w-full py-2 rounded-lg border border-background2 hover:bg-blue-800 md:w-auto">
              Edit
            </button>
          </div>
        </div>
      </>
    </Frame>
  );
}
