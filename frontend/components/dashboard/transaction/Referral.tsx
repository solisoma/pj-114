import React, { useEffect, useState } from "react";
import { FaGift } from "react-icons/fa";
import { GoArrowUpLeft } from "react-icons/go";
import { TiArrowRightOutline } from "react-icons/ti";
import { MdInsertLink } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { User } from "../type";
import { toast } from "react-toastify";
import { MultiType } from "@/api/type";
import { get_referrals } from "@/api/transactions";
import { RefTable } from "../RefTable";

export default function Referral({ userDetail }: { userDetail: User }) {
  const [referrals, setReferrals] = useState<MultiType[] | null>();

  async function getRef() {
    const refs = await get_referrals();
    setReferrals(refs);
  }

  useEffect(() => {
    getRef();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
        <div>
          <p className="relative font-bold text-3xl text-black z-[10]">
            Referrals
          </p>
        </div>
        <div className="absolute h-[15rem] right-0 -bottom-2">
          <img src="/deposit.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
          <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
            <h2 className="relative font-base text-xl">Referral Bonus</h2>
            <div>
              <div className="flex gap-2 justify-between">
                <h2 className="font-bold text-3xl">
                  ${Number(userDetail.referralBonus)}
                </h2>
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
              </div>
            </div>
            <button className="flex gap-2 rounded-lg justify-center items-center bg-[#D5745B] px-4 py-2">
              <p className="text-white">Refer & Earn</p>
              <TiArrowRightOutline size={15} color="white" />
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 rounded-lg py-4 px-2 w-full bg-[#1E222D]">
          <div className="flex-1 flex flex-col gap-4 rounded-lg p-8 w-full bg-[#1E222D]">
            <div className="flex flex-col gap-2">
              <h2 className="relative font-base text-xl">Referral Us & Earn</h2>
              <p className="text-sm">
                Use the below link to invite your friends.
              </p>
            </div>
            <div className="flex items-center">
              <div className="bg-[#EBF3FE] px-2 py-1">
                <MdInsertLink size={17} color="black" />
              </div>
              <h2 className="border p-1 rounded-lg text-[15px] w-full overflow-hidden text-ellipsis whitespace-nowrap md:text-sm">
                {`https://quantureinc.netlify.app/account/sign-up?ref=${userDetail.referral_id}`}
              </h2>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://quantureinc.netlify.app/account/sign-up?ref=${userDetail.referral_id}`
                );
                toast.success("Link copied to clipboard!");
              }}
              className="flex gap-2 rounded-lg justify-center items-center bg-background2 px-4 py-2"
            >
              <FaRegCopy size={17} color="white" />
              <p className="text-white">Copy Link</p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl">Referral List</h2>
          <p className="text-sm">List of referred users</p>
        </div>
        <RefTable tableData={referrals || []} />
      </div>
    </div>
  );
}
