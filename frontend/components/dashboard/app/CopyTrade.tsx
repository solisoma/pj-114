import React from "react";
import CopyBox from "./CopyBox";

export default function CopyTrade() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-bold text-3xl">TOP TRADE MASTERS</h2>
      </div>
      <div className="flex flex-col gap-4 md:flex-wrap md:flex-row">
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
        <div className="w-full md:w-[49%]">
          <CopyBox percent={10} accuracy="98%" min={10000} />
        </div>
      </div>
    </div>
  );
}
