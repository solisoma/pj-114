import React from "react";

export default function Error({ msg }: { msg: string }) {
  return (
    <div className="bg-[#fef0f0] border-[#f9b9b8] border-2 text-[#ec5150] p-1.5 rounded-md text-sm md:text-[.8vw] md:p-[.3vw]">
      {msg}
    </div>
  );
}
