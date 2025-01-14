"use client";
import React, { useState } from "react";
import Manual from "./Manual";
import Paystack from "./Paystack";
type Tab = "manual" | "paystack";

export default function Deposit({
  refresh,
}: {
  refresh?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [tab, setTab] = useState<Tab>("manual");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 text-white">
        {/* <button
          onClick={() => setTab("paystack")}
          className={`${
            tab === "paystack" ? "bg-btn" : "bg-tex"
          } inline-block rounded-lg py-2 px-4 transition transform duration-300 hover:scale-110 font-bold`}
        >
          Paystack
        </button> */}
        <button
          onClick={() => setTab("manual")}
          className={`${
            tab === "manual" ? "bg-btn" : "bg-tex"
          } inline-block rounded-lg py-2 px-4 transition transform duration-300 hover:scale-110 font-bold`}
        >
          Manual
        </button>
      </div>
      <div className="bg-background3 remove-scrollbar overflow-y-auto h-[70vh] md:h-[80vh]">
        {tab === "manual" ? (
          <div className="flex items-center justify-center md:h-[inherit]">
            <Manual />
          </div>
        ) : (
          <div className="flex h-[50vh] items-center justify-center md:h-[60vh] ">
            <Paystack refresh={refresh!} />
          </div>
        )}
      </div>
    </div>
  );
}
