"use client";
import { NavType } from "@/utils/type";
import React from "react";

export default function PrettyMenu({
  nav,
  activeLink,
  route,
  setShowMobileMenu,
}: {
  nav: NavType;
  activeLink: string;
  route: (param: string) => void;
  setShowMobileMenu: (param: boolean) => void;
}) {
  return (
    <>
      <h2 className="text-white font-bold ml-1 md:ml-6">{nav.header}</h2>
      {nav.content.map((inav, i) => {
        return (
          <button
            onClick={() => {
              setShowMobileMenu(false);
              route(inav.route || "#");
            }}
            key={i}
            className={`flex items-center text-gray-300 ${
              activeLink == inav.route && "bg-background2"
            } px-3 md:px-[2.3vw] rounded-xl gap-2 py-2 md:gap-[1.2vw] md:py-[1vw]`}
          >
            {inav.route === "notification" ? (
              <inav.icon
                className={
                  JSON.parse(localStorage.getItem("notis") || "{}").exist
                    ? "text-red-600"
                    : "text-white"
                }
                size={24}
              />
            ) : (
              <inav.icon className="text-white" size={24} />
            )}
            <p className="block md:text-[1rem]">{inav.text}</p>
          </button>
        );
      })}
    </>
  );
}
