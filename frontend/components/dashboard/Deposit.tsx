import React, { useState } from "react";
import { LogOutActionType } from "./type";
import Button from "../Button";
import { toast } from "react-toastify";
import { deposit, sendProof } from "@/api/transactions";
import { MultiType } from "@/api/type";

export function Deposit({
  closeModal,
  onPurchase,
}: LogOutActionType): React.JSX.Element {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [id, setId] = useState<number | undefined>();
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const walletAddress = "0x1234...abcd";

  async function handleConfirm() {
    if (amount && amount > 0) {
      try {
        setLoading(true);
        const send = await deposit({ amount });
        if (!send) throw new Error("failed");

        setId((send as MultiType).id);
        setConfirmPayment(true);
        setLoading(false);
      } catch {
        toast.info("An error occurred please try again");
      }
    } else {
      toast.error("Please enter a valid amount.");
    }
  }

  async function handleSubmitProof() {
    if (!paymentProof) {
      toast.error("Please upload a payment proof.");
      return;
    }
    try {
      // Logic to handle proof submission
      await sendProof(id!, paymentProof);
      toast.success("Payment proof submitted successfully.");
      onPurchase!();
      closeModal!();
    } catch (e) {
      toast.error("Failed to submit payment proof. Please try again.");
    }
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied to clipboard!");
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full">
        {!confirmPayment ? (
          <>
            <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">
              Enter Deposit Amount
            </h2>
            <p className="text-[#A0AEC0] mb-6">
              Please specify the amount you wish to deposit. Once confirmed, you
              will receive a wallet address for the payment.
            </p>
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
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">
              Complete Your Payment
            </h2>
            <p className="text-[#A0AEC0] mb-4">
              Please scan the QR code or use the wallet address below to
              complete your payment. Then, upload the payment proof.
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 flex flex-col items-center">
              <img
                src="/qr.png" // Replace with your QR code generation logic
                alt="QR Code"
                className="mb-2 w-[20%] h-[20%]"
              />
              <div className="flex items-center justify-between w-full gap-2">
                <p className="text-sm text-gray-600 font-mono break-words">
                  Wallet Address: {walletAddress}
                </p>
                <Button
                  onClick={handleCopyAddress}
                  text="Copy"
                  type="background"
                  url="#"
                  style="from-background2 to-background2 py-1 px-3 md:py-2 md:px-4"
                />
              </div>
            </div>
            <input
              type="file"
              onChange={({ target }) => {
                if (target) {
                  setPaymentProof(target.files![0]);
                } else {
                  setPaymentProof(null);
                }
              }}
              className="w-full mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleSubmitProof}
                text="Submit Proof"
                type="background"
                url="#"
                style="from-background2 to-background2 py-2 px-4 md:py-3 md:px-6"
              />
              <Button
                onClick={() => closeModal!()}
                text="Cancel"
                type="background"
                url="#"
                style="from-btn to-btn py-2 px-4 md:py-3 md:px-6"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
