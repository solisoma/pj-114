import React, { SetStateAction, useState } from "react";
import Button from "../Button";
import Link from "next/link";
import { MultiType } from "@/api/type";
import { RxCross2 } from "react-icons/rx";
import { dynamicURL } from "@/utils/nav";

export default function MobileNav({
  showDropDown,
  setShowDropDown,
  activeLink,
  auth,
  removeAuth,
  user,
}: {
  activeLink: string;
  auth: boolean;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<SetStateAction<boolean>>;
  removeAuth: boolean;
  user: MultiType | null;
}) {
  const [sid, setSid] = useState<number | null>(null);

  return (
    <div
      onClick={(e) =>
        (e.target as any).id == "parent" && setShowDropDown(false)
      }
      id="parent"
      className={`absolute block z-[999] top-0 h-[100vh] w-[100vw] bg-[#00000050] ${
        showDropDown ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-700 md:hidden`}
    >
      <div className="flex items-center justify-between px-2 bg-[#1F2127] w-[70%] h-[15%]">
        <Link href="/">
          <img src="/clans-logo.png" className="w-[3rem]" />
        </Link>
        <button onClick={() => setShowDropDown(false)}>
          <RxCross2 color="white" size={32} />
        </button>
      </div>
      <div className="px-8 w-[70%] h-[85%] bg-[#1F2127]">
        <div className="flex flex-col justify-between gap-4">
          <Link
            href="/"
            className={`font-medium text-base ${
              activeLink === "Home" ? "text-[#034AA6]" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-medium text-base ${
              activeLink === "About Us" ? "text-[#034AA6]" : "text-white"
            }`}
          >
            About Us
          </Link>
          {dynamicURL.map((url, k) => (
            <div
              key={k}
              onClick={() => setSid((prev) => (prev === k ? null : k))}
              className={`font-medium text-base ${
                url.links.map((item) => item.name).includes(activeLink)
                  ? "text-[#034AA6]"
                  : "text-white"
              } hover:underline md:text-[1vw] cursor-pointer`}
            >
              <p>{url.name}</p>
              <div
                className={`${
                  sid === k ? "relative" : "hidden"
                } z-[10] left-2 flex flex-col gap-1 rounded-lg bg-[#1F2127] min-w-[10vw] p-[.6rem]`}
              >
                {url.links.map((item, i) => (
                  <Link
                    className={`text-sm ${
                      activeLink === item.name ? "text-[#034AA6]" : "text-white"
                    } hover:underline`}
                    key={i}
                    href={item.link}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {!auth && !removeAuth && (
            <>
              {user ? (
                <Link
                  href="/dashboard?page=overview"
                  className="font-medium text-base"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/account/sign-in"
                    className={`font-medium text-base ${
                      activeLink === "Contact" ? "text-[#646464]" : "#646464"
                    }`}
                  >
                    Sign in
                  </Link>
                  <Button
                    text="Sign Up"
                    type="background"
                    url="/account/sign-up"
                    style="from-[#00CCFF] to-[#034AA6] py-3 rounded-xl text-center w-[30vw] shadow-md shadow-black"
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
