import React, { useEffect, useState } from "react";
import { ContentPage } from "./ContentPage";
import { FaWallet } from "react-icons/fa";
import Modal from "../Modal";
import { AddWallet } from "../AddWallet";
import { MultiType } from "@/api/type";
import { toast } from "react-toastify";
import { get_all_wallet, update_wallet } from "@/api/admin";

export default function Wallets() {
  const [showLogOut, setShowLogoOut] = useState(false);
  const [initialValue, setInitialValue] = useState<MultiType>();
  const [wallet, setWallet] = useState<MultiType[]>();

  async function getWallet() {
    const wallets = await get_all_wallet();
    if (wallets) setWallet(wallets as MultiType[]);
  }

  async function handleAction(details: MultiType) {
    try {
      const add = await update_wallet(details);
      if (add) {
        await getWallet();
        toast.success("Wallet updated successfully");
        return;
      }
      throw new Error("An error occured");
    } catch {
      toast.error("Failed to update  wallet");
    }
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-4 md:mt-0">
      <div className="flex w-full justify-end">
        <a
          href="/dashboard?page=admin"
          className="bg-background2 px-4 py-1 rounded-lg"
        >
          Go back
        </a>
      </div>
      <ContentPage
        flexType="flex-col gap-4"
        width="w-full"
        height="h-[78%] overflow-y-auto md:h-[87%]"
        px="px-4"
      >
        {wallet?.map((walt) => (
          <div className="w-full h-[4rem] border border-gray-400 rounded-lg flex gap-4 items-center justify-around px-4 py-4 cursor-pointer">
            <FaWallet size={30} />
            <p className="text-xl">{walt.name}</p>
            <button
              onClick={() => {
                setInitialValue(walt);
                setShowLogoOut(true);
              }}
              className="bg-background2 px-4 py-1 rounded-lg"
            >
              Edit
            </button>
          </div>
        ))}
      </ContentPage>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        <AddWallet
          initialValue={initialValue || {}}
          onAction={handleAction}
          action="update"
          isWallet
        />
      </Modal>
    </div>
  );
}
