import React, { useEffect, useState } from "react";
import Frame from "./Frame";
import { TbBuildingBank } from "react-icons/tb";
import Modal from "../Modal";
import { AddWallet } from "../AddWallet";
import {
  add_wallet,
  delete_wallet,
  get_wallet,
  update_wallet,
} from "@/api/transactions";
import { MultiType } from "@/api/type";
import { toast } from "react-toastify";
import { DeleteWallet } from "../Utils";
import { User } from "../type";

export default function Account({
  userDetail,
  setUser,
}: {
  setUser?: () => void;
  userDetail?: User;
}) {
  const [action, setAction] = useState("delete");
  const [showLogOut, setShowLogoOut] = useState(false);
  const [initialValue, setInitialValue] = useState<MultiType>();
  const [wallet, setWallet] = useState<MultiType[]>();

  async function handleAction(details: MultiType) {
    if (action === "add") {
      try {
        const add = await add_wallet(details);
        if (add) {
          await getWallet();
          toast.success("Wallet added successfully");
          return;
        }
        throw new Error("An error occured");
      } catch {
        toast.error("Failed to add wallet");
      }
    } else {
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
  }

  async function handleDelete() {
    try {
      const remove = await delete_wallet(initialValue!.id);
      if (remove) {
        await getWallet();
        toast.success("Wallet removed successfully");
        return;
      }
      throw new Error("An error occured");
    } catch {
      toast.error("Failed to remove wallet");
    }
  }

  async function getWallet() {
    const wallets = await get_wallet();
    if (wallets) setWallet(wallets as MultiType[]);
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <>
      <Frame>
        <>
          {!userDetail!.isVerified && (
            <div className="flex flex-col py-8 px-6 gap-4 rounded-lg bg-[#1E222D] md:flex-row md:justify-between md:gap-0">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-xl">KYC Verification</h2>
                <p className="text-red-700 text-xm">
                  Note: You have to complete your KYC Verification to access
                  withdrawals
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href="/dashboard?page=kyc"
                  className="px-6 py-2 rounded-lg bg-background2"
                >
                  {userDetail!.front_image ? "Pending" : "Verify"}
                </a>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 py-8 px-6 md:flex-row md:justify-between md:gap-0">
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xl">Your Accounts</h2>
              <p className="text-xm">
                Below are your saved accounts that you can withdraw your funds
                to.
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setAction("add");
                  setInitialValue({
                    label: "",
                    address: "",
                    name: "",
                  });
                  setShowLogoOut(true);
                }}
                className="px-6 py-2 rounded-lg bg-background2"
              >
                Add Account
              </button>
            </div>
          </div>
          {wallet?.map((itm, i) => (
            <div
              key={i}
              className="flex flex-col py-8 px-6 gap-4 rounded-lg bg-[#1E222D] md:flex-row md:justify-between md:gap-0"
            >
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-[1rem]">
                  Crypto Wallet ({itm.label})
                </h2>
                <div className="flex gap-4 items-center">
                  <TbBuildingBank size={24} />
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(itm.address);
                      toast.success("Wallet address copied to clipboard!");
                    }}
                    className="cursor-pointer"
                  >
                    <h2 className="font-bold">{itm.name}</h2>
                    <p className="text-sm">{itm.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAction("delete");
                    setInitialValue({
                      id: itm.id,
                      label: itm.label,
                      address: itm.address,
                      name: itm.name,
                    });
                    setShowLogoOut(true);
                  }}
                  className="px-6 py-2 rounded-lg border border-[#FA896B] hover:bg-yellow-600"
                >
                  Delete
                </button>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setAction("edit");
                    setInitialValue({
                      id: itm.id,
                      label: itm.label,
                      address: itm.address,
                      name: itm.name,
                    });
                    setShowLogoOut(true);
                  }}
                  className="px-6 w-full py-2 rounded-lg border border-background2 hover:bg-blue-800 md:w-auto"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      </Frame>
      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        {action === "delete" ? (
          <DeleteWallet onDelete={handleDelete} />
        ) : (
          <AddWallet
            initialValue={initialValue || {}}
            onAction={handleAction}
            action={action}
          />
        )}
      </Modal>
    </>
  );
}
