import React, { useState } from "react";
import { LogOutActionType } from "./type";
import Button from "../Button";
import { toast } from "react-toastify";
import { withdraw } from "@/api/transactions";
import { wallets } from "@/utils/info";

export function Withdraw({
  closeModal,
  onAction,
  balance,
}: LogOutActionType & { balance: string }): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [name, setName] = useState<string>("");

  const isValidAmount = amount && amount > 0;
  const isValidWallet =
    walletAddress.length > 5 && walletAddress.startsWith("T");

  async function handleConfirm() {
    if (!isValidAmount) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }

    if (!name) {
      toast.error("Please select the wallet type.");
      return;
    }

    if (!isValidWallet) {
      toast.error("Please enter a valid USDT(TRC20) wallet address.");
      return;
    }

    if (amount > Number(balance)) {
      toast.error("Insufficient funds.");
      return;
    }

    try {
      setLoading(true);
      const send = await withdraw({ amount });
      if (!send) throw new Error("Transaction failed. Please try again.");
      toast.success("Withdrawal request submitted successfully.");
      setLoading(false);
      onAction!();
      closeModal!();
    } catch {
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full max-w-md bg-[#1E222D] rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#ffffff] mb-4">
          Enter Withdrawal Amount
        </h2>
        <p className="text-[#A0AEC0] mb-6">
          Kindly enter the amount you would like to withdraw. Once confirmed, we
          will process the request and transfer the funds to your wallet.
        </p>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2  border rounded-md text-gray-800"
          />
          <p className="flex justify-end">{balance} USD</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#ffffff] mb-4">
            Select Wallet Type
          </h2>
          <select
            className="w-full border rounded-md px-4 py-2 text-gray-800"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option disabled value="">
              Wallet Type
            </option>
            {wallets.map((wallet, i) => (
              <option key={i} value={wallet.value}>
                {wallet.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-xl font-bold text-[#ffffff] mb-4">
          Enter Your Wallet Address
        </h2>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
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
            text={loading ? "Processing..." : "Confirm"}
            type="background"
            url="#"
            disabled={loading || !isValidAmount || !isValidWallet}
            style="from-background2 to-background2 py-2 px-4 md:py-3 md:px-6"
          />
        </div>
      </div>
    </div>
  );
}
