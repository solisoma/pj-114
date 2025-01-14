"use client";
import React from "react";
import { ModalType2 } from "./type";
import { IoMdClose } from "react-icons/io";

export default function Pop({
  children,
  visible,
  setVisible,
  styleString,
  size,
}: ModalType2) {
  const closeModal = () => setVisible(false);
  return (
    <main
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      className={`fixed z-[100] top-0 left-0 flex justify-center h-screen w-full ${
        visible ? "block" : "hidden"
      } bg-black bg-opacity-70`}
    >
      <div
        onClick={(e) => e.target === e.currentTarget && closeModal()}
        className="relative flex flex-col justify-center h-[83vh]"
      >
        <div
          className={`relative flex flex-col gap-4 ${
            size ? size : "w-screen md:w-[50vw] min-h-[30vh] max-h-[75vh]"
          } top-9 py-4 px-8 overflow-hidden ${
            styleString
              ? styleString
              : "bg-gradient-to-b from-white via-[#A6EDFF] to-white"
          } md:rounded-lg`}
        >
          <div className="flex justify-end">
            <IoMdClose
              onClick={() => closeModal()}
              className="cursor-pointer"
              color="white"
              size={30}
            />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
