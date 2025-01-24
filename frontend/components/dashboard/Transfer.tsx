import React, { useState } from "react";
import { LogOutActionType, User } from "./type";
import { toast } from "react-toastify";
import { transfer } from "@/api/transactions";

export default function Transfer({
  closeModal,
  userDetail,
  onAction,
  setUser,
}: LogOutActionType & {
  userDetail: User;
  setUser?: () => void;
}) {
  const options = ["Main", "Copy trade", "Investment"];
  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);
  const [amountFirst, setAmountFirst] = useState<number | undefined>();
  const [balanceFirst, setBalanceFirst] = useState<number | undefined>();
  const [balanceSecond, setBalanceSecond] = useState<number | undefined>();
  const hashTable = {
    Main: "balance",
    "Copy trade": "copytrade_balance",
    Investment: "plan_balance",
  };
  const handleSelectFirst = (value: string) => {
    setSelectedFirst(value);
    if (value === selectedSecond) setSelectedSecond(null);
    if (value !== selectedSecond) {
      const balance =
        value == "Main"
          ? userDetail.balance
          : value === "Investment"
          ? userDetail.plan_balance
          : userDetail.copytrade_balance;
      setBalanceFirst(balance);
    }
  };

  const handleSelectSecond = (value: string) => {
    setSelectedSecond(value);
    if (value === selectedFirst) setSelectedFirst(null);
    if (value !== selectedFirst) {
      const balance =
        value == "Main"
          ? userDetail.balance
          : value === "Investment"
          ? userDetail.plan_balance
          : userDetail.copytrade_balance;
      setBalanceSecond(balance);
    }
  };

  const handleSubmit = async () => {
    if (
      !selectedFirst ||
      !selectedSecond ||
      !balanceFirst ||
      !balanceSecond ||
      !amountFirst
    ) {
      toast.info("Please fill in all fields.");
      return;
    }

    if (amountFirst > balanceFirst) {
      toast.info("Insufficient funds");
      return;
    }

    // Perform transfer logic here
    const send = await transfer({
      from: hashTable[selectedFirst as keyof typeof hashTable],
      to: hashTable[selectedSecond as keyof typeof hashTable],
      amount: amountFirst,
    });

    if (send) {
      setUser!();
      toast.success("Asset transferred successfully");
      await onAction!();
      closeModal!();
    } else {
      toast.error("Transfer failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Transfer Asset</h2>
        <p className="text-gray-400 mb-6">
          Select the assets to transfer between and specify the amounts.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            From Account
          </label>
          <select
            value={selectedFirst || ""}
            onChange={(e) => handleSelectFirst(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[inherit] text-white"
          >
            <option value="" disabled>
              Select an asset
            </option>
            {options
              .filter((option) => option !== selectedSecond)
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <input
            type="number"
            placeholder="Enter amount"
            value={amountFirst || ""}
            onChange={(e) => setAmountFirst(Number(e.target.value))}
            className="outline-none w-full px-4 py-2 mt-2 rounded-md border border-gray-600 text-black"
          />
          <p className="flex justify-end">{balanceFirst} USD</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            To Account
          </label>
          <select
            value={selectedSecond || ""}
            onChange={(e) => handleSelectSecond(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[inherit] text-white"
          >
            <option value="" disabled>
              Select an asset
            </option>
            {options
              .filter((option) => option !== selectedFirst)
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <input
            type="number"
            placeholder="Enter amount"
            disabled
            value={amountFirst || ""}
            className="outline-none w-full px-4 py-2 mt-2 rounded-md border border-gray-600 text-white"
          />
          <p className="flex justify-end">{balanceSecond} USD</p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold"
        >
          Transfer Asset
        </button>
      </div>
    </div>
  );
}
