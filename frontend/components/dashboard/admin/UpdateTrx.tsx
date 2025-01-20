import Button from "@/components/Button";
import { trxStatus } from "@/utils/info";
import React, { useState } from "react";
import { LogOutActionType } from "../type";
import { toast } from "react-toastify";
import { update_trx } from "@/api/admin";
import { MultiType } from "@/api/type";

export default function UpdateTrx({
  closeModal,
  onAction,
  initialValue,
}: LogOutActionType & { initialValue: MultiType }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>(initialValue.status);

  async function handleConfirm() {
    if (status) {
      try {
        setLoading(true);

        if (status === initialValue.status) {
          setLoading(false);
          closeModal!();
          toast.success("Transaction status updated successfully");
        }

        const send = await update_trx({ status, id: initialValue.id });
        if (!send) throw new Error("failed");
        onAction!();
        setLoading(false);
        closeModal!();
        toast.success("Transaction status updated successfully");
      } catch {
        setLoading(false);
        toast.info("An error occurred please try again");
      }
    } else {
      toast.error("Please status is required");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="p-6 md:p-8 w-full">
        <h2 className="text-xl font-bold text-[#FFFFFF] mb-6">
          Update transaction status
        </h2>
        <h2 className="font-bold text-xl mb-2">Status</h2>
        <select
          className="w-full border rounded-md px-4 mb-6 py-2 text-gray-800"
          value={initialValue.status}
          onChange={({ target }) => setStatus(target.value)}
        >
          <option disabled selected value="">
            Payment Method
          </option>
          {trxStatus.map((trx, i) => (
            <option key={i} value={trx.value}>
              {trx.name}
            </option>
          ))}
        </select>
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
