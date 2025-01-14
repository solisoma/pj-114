import React from "react";
import { PopUpType } from "./type";

export default function PopUp({ children, id, currentId, above }: PopUpType) {
  return (
    <div
      className={`flex flex-col transform ${
        currentId == id ? "scale-y-full" : "-scale-y-0"
      } duration-500 gap-3 absolute bg-dropdown z-[99] w-[40%] p-2 rounded-lg h-auto shadow-xl text-base right-2 ${
        above ? "bottom-[90%]" : "top-[90%]"
      } md:w-[20%]`}
    >
      {children}
    </div>
  );
}
