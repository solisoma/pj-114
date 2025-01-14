import React from "react";

export default function Frame({ children }: { children: React.JSX.Element }) {
  return (
    <div className="flex flex-col items-center py-8 gap-8 md:py-[3vw] md:gap-[1vw] border-2 border-[#f6f6f7] rounded-xl">
      <div className="flex flex-col w-[90%] gap-[1.4rem] md:gap-[1.7vw]">
        {children}
      </div>
    </div>
  );
}
