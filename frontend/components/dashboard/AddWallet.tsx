import React, { useState } from "react";
import { LogOutActionType } from "./type";
import Button from "../Button";
import { toast } from "react-toastify";
import { MultiType } from "@/api/type";

export function AddWallet({
  closeModal,
  onAction,
  initialValue,
  action,
}: LogOutActionType & {
  initialValue: MultiType;
  action: string;
}): React.JSX.Element {
  const [address, setAddress] = useState<string>(initialValue.address);
  const [label, setLabel] = useState<string>(initialValue.label);

  async function handleSubmit() {
    if (!address) {
      toast.error("Wallet address is required.");
      return;
    }
    // Validate the wallet address for TRC20 format
    const isValidTrc20 = address.startsWith("T"); // Simple check for TRC20 addresses
    if (!isValidTrc20) {
      toast.error("Please enter a valid TRC20 wallet address.");
      return;
    }

    try {
      // Handle the submission logic here (save data, etc.)
      await onAction!({ ...initialValue, name: "USDT(TRC20)", address, label });
      closeModal!(); // Close the modal after successful submission
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full">
        <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">Add Wallet</h2>
        <div className="mb-6">
          <label className="block text-[#A0AEC0] mb-2">Name</label>
          <input
            type="text"
            value="USDT(TRC20)"
            readOnly
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#A0AEC0] mb-2">Wallet Address</label>
          <input
            type="text"
            placeholder="Enter TRC20 wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
          <p className="text-[#A0AEC0] text-sm mt-2">
            * Please ensure the wallet address is for USDT (TRC20).
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-[#A0AEC0] mb-2">Label (Optional)</label>
          <input
            type="text"
            placeholder="Optional label for the wallet"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-2 px-4 md:py-3 md:px-6"
          />
          <Button
            onClick={handleSubmit}
            text={action === "add" ? "Add Wallet" : "Update Wallet"}
            type="background"
            url="#"
            style="from-background2 to-background2 py-2 px-4 md:py-3 md:px-6"
          />
        </div>
      </div>
    </div>
  );
}
