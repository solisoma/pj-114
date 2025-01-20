import React, { useState } from "react";
import { LogOutActionType } from "./type";
import Button from "../Button";
import { toast } from "react-toastify";
import { MultiType } from "@/api/type";
import { wallets } from "@/utils/info";

export function AddWallet({
  closeModal,
  onAction,
  initialValue,
  action,
  isWallet,
}: LogOutActionType & {
  initialValue: MultiType;
  action: string;
  isWallet?: boolean;
}): React.JSX.Element {
  const [address, setAddress] = useState<string>(initialValue.address);
  const [label, setLabel] = useState<string>(initialValue.label);
  const [name, setName] = useState<string>(initialValue.name);
  const [qrcode, setQrcode] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  async function handleSubmit() {
    if (!address) {
      toast.error("Wallet address is required.");
      return;
    }

    if (!name) {
      toast.error("Name is required.");
      return;
    }

    try {
      // Handle the submission logic here (save data, etc.)
      await onAction!({ ...initialValue, name, address, label, qrcode });
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
          <select
            className="w-full border rounded-md px-4 py-2 text-gray-800"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option disabled value="">
              Wallet Name
            </option>
            {wallets.map((wallet, i) => (
              <option key={i} value={wallet.value}>
                {wallet.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-[#A0AEC0] mb-2">Wallet Address</label>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          />
          <p className="text-[#A0AEC0] text-sm mt-2">
            * Please ensure the wallet address is for USDT (TRC20).
          </p>
        </div>
        {isWallet ? (
          <div className="mb-4">
            <label
              htmlFor="addressProof"
              className="block text-text-[#A0AEC0] font-medium mb-2"
            >
              QR Code
            </label>
            <input
              type="file"
              id="addressProof"
              onChange={(e) => handleFileChange(e, setQrcode)}
              className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-[#A0AEC0] mb-2">
              Label (Optional)
            </label>
            <input
              type="text"
              placeholder="Optional label for the wallet"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-800"
            />
          </div>
        )}
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
