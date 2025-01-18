import React, { useState } from "react";
import CopyBox from "./CopyBox";
import { traders } from "@/utils/info";
import Modal from "../Modal";
import CopyModal from "./CopyModal";
import { User } from "../type";

export default function CopyTrade({
  userDetail,
  setUser,
}: {
  userDetail?: User;
  setUser?: () => Promise<void>;
}) {
  const [showLogOut, setShowLogoOut] = useState(false);
  const [details, setDetails] = useState<(typeof traders)[0]>();

  function handleInvest(dets: (typeof traders)[0]) {
    setDetails(dets);
    setShowLogoOut(true);
  }
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="font-bold text-3xl">TOP TRADE MASTERS</h2>
        </div>
        <div className="flex flex-col gap-4 md:flex-wrap md:flex-row">
          {traders.map((itm, i) => (
            <div key={i} className="w-full md:w-[49%]">
              <CopyBox
                details={itm}
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
        <CopyModal
          details={details!}
          userDetail={userDetail!}
          onPurchase={setUser!}
        />
      </Modal>
    </>
  );
}
