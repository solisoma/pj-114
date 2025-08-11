import Button from "@/components/Button";
import React, { useState } from "react";
import { LogOutActionType } from "../type";
import { toast } from "react-toastify";
import { update_pnl, update_trx } from "@/api/admin";
import { MultiType } from "@/api/type";

export default function UpdatePnl({
  closeModal,
  onAction,
  initialValue,
}: LogOutActionType & { initialValue: MultiType }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(initialValue.amount);

  async function handleConfirm() {
    if (amount) {
      try {
        setLoading(true);

        if (amount === initialValue.amount) {
          setLoading(false);
          closeModal!();
          toast.success("No changes was made");
        }

        const send = await update_pnl({
          amount,
          userId: initialValue.userId,
          pnlId: initialValue.id,
        });
        if (!send) throw new Error("failed");
        onAction!();
        setLoading(false);
        closeModal!();
        toast.success("PnL amount updated successfully");
      } catch {
        setLoading(false);
        toast.info("An error occurred please try again");
      }
    } else {
      toast.error("Please amount is required");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full">
        <h2 className="text-xl font-bold text-[#FFFFFF] mb-6">
          Update PnL amount
        </h2>
        <h2 className="font-bold text-xl mb-2">Amount</h2>
        <input
          type="number"
          className="w-full border rounded-md px-4 mb-6 py-2 text-gray-800"
          value={amount}
          onChange={({ target }) => setAmount(Number(target.value))}
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
