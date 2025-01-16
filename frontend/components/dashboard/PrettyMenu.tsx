"use client";
import { NavType } from "@/utils/type";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

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
  const [showSub, setShowSub] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  function isParent(activeLink: string, inav: (typeof nav.content)[0]) {
    if (activeLink === inav.route) return true;
    if (inav.sub) {
      if (inav.sub.map((itm) => itm.route).includes(activeLink)) return true;
    }
    return false;
  }

  return (
    <>
      <h2 className="text-white font-bold ml-1 md:ml-6">{nav.header}</h2>
      {nav.content.map((inav, i) => {
        return (
          <div key={i}>
            <button
              onClick={() => {
                if (inav.sub) {
                  setShowSub((prev) => !prev);
                  setIndex(i);
                } else {
                  setShowMobileMenu(false);
                  route(inav.route || "#");
                }
              }}
              className={`w-full flex items-center text-gray-300 ${
                isParent(activeLink, inav) && "bg-background2"
              } ${
                showSub &&
                index === i &&
                !isParent(activeLink, inav) &&
                "border"
              } pl-4 md:pl-[2vw] rounded-xl gap-2 py-2 md:py-[1vw] md:gap-[1.2vw]`}
            >
              <inav.icon className="text-white" size={24} />
              <div className="flex items-center gap-4">
                <p className="block md:text-[1rem]">{inav.text}</p>
                {inav.sub && (
                  <>
                    {showSub ? (
                      <MdKeyboardArrowDown size={20} />
                    ) : (
                      <MdKeyboardArrowRight size={20} />
                    )}
                  </>
                )}
              </div>
            </button>
            {inav.sub && (
              <div className={showSub ? "block" : "hidden"}>
                {inav.sub?.map((itm, i) => (
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      route(itm.route || "#");
                    }}
                    key={i}
                    className={`flex items-center text-gray-300 pl-10 md:pl-[4vw] py-1 md:py-[.3vw]`}
                  >
                    <p
                      className={`block md:text-[.9rem] ${
                        activeLink == itm.route && "text-background2"
                      }`}
                    >
                      {itm.text}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
