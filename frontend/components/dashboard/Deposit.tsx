import React, { useState } from "react";
import { LogOutActionType } from "./type";
import Button from "../Button";
import { toast } from "react-toastify";
import { wallets } from "@/utils/info";

export function Deposit({ closeModal }: LogOutActionType): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [name, setName] = useState<string | undefined>();

  async function handleConfirm() {
    if (!name) {
      toast.error("Please choose a payment method");
      return;
    }
    if (amount && amount > 0 && name) {
      try {
        setLoading(true);
        window.location.href = `/dashboard?page=fundwallet&name=${name}&amount=${amount}`;
      } catch {
        setLoading(false);
        toast.info("An error occurred please try again");
      }
    } else {
      toast.error("Please enter a valid amount.");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full">
        <h2 className="text-xl font-bold text-[#FFFFFF]">Fund Account</h2>
        <p className="text-[#A0AEC0] text-xs mb-6">
          Deposit Funds into your account directly
        </p>
        <h2 className="font-bold text-xl mb-2">Payment Method</h2>
        <select
          className="w-full border rounded-md px-4 mb-6 py-2 text-gray-800"
          onChange={({ target }) => setName(target.value)}
        >
          <option disabled selected value="">
            Payment Method
          </option>
          {wallets.map((wallet, i) => (
            <option key={i} value={wallet.value}>
              {wallet.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-md text-gray-800 mb-6"
        />
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-2 px-4 md:py-3 md:px-6"
          />
          <Button
            onClick={handleConfirm}
            text={loading ? "Sending..." : "Confirm"}
            type="background"
            url="#"
            disabled={loading}
            style="from-background2 to-background2 py-2 px-4 md:py-3 md:px-6"
          />
        </div>
      </div>
    </div>
  );
}
