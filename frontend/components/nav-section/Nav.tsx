"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Link from "next/link";
import MobileNav from "./Mobile";
import { getSecureStorage } from "@/api/auth";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dynamicURL } from "@/utils/nav";
import { AiOutlineMenu } from "react-icons/ai";

export default function Nav({
  activeLink,
  auth,
  removeAuth,
}: {
  activeLink: string;
  auth?: boolean;
  removeAuth?: boolean;
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [show, setShow] = useState(false);
  const [sid, setSid] = useState<number | null>(null);

  async function checkUser() {
    const user = await getSecureStorage("token");
    setUserExist(user);
    setShow(true);
  }

  useEffect(() => {
    checkUser();
  }, []);
  return (
    show && (
      <>
        <div className="flex flex-col items-center">
          <div className={`w-[95%] ${auth && "md:w-[48%]"}`}>
            <div className="flex items-center justify-between">
              <Link href="/">
                <img
                  src="/full-icon.png"
                  className={`${
                    auth ? "md:w-[2vw] w-[3rem]" : "md:w-[10vw] w-[10rem]"
                  }`}
                />
              </Link>
              <div
                className={`hidden md:flex md:items-center ${
                  auth ? "gap-4" : "gap-8"
                }`}
              >
                <Link
                  href="/"
                  className={`font-medium text-base ${
                    activeLink === "Home" ? "text-[#034AA6]" : "text-[#646464]"
                  } hover:underline md:text-[1vw]`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`font-medium text-base ${
                    activeLink === "About Us"
                      ? "text-[#034AA6]"
                      : "text-[#646464]"
                  } hover:underline md:text-[1vw]`}
                >
                  About Us
                </Link>
                {dynamicURL.map((url, k) => (
                  <div
                    key={k}
                    onMouseEnter={() => setSid(k)}
                    onMouseLeave={() => setSid(null)}
                    className={`relative font-medium text-base ${
                      url.links.map((item) => item.name).includes(activeLink)
                        ? "text-[#034AA6]"
                        : "text-[#646464]"
                    } hover:underline md:text-[1vw] cursor-pointer`}
                  >
                    <p>{url.name}</p>
                    <div
                      className={`${
                        sid === k ? "absolute" : "hidden"
                      } z-[10] top-[1.7rem] flex flex-col gap-1 rounded-lg bg-[#1F2127] min-w-[10vw] p-[.6rem]`}
                    >
                      {url.links.map((item, i) => (
                        <Link
                          className={`text-sm ${
                            activeLink === item.name
                              ? "text-[#034AA6]"
                              : "text-[#646464]"
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
                    {userExist ? (
                      <Link
                        href="/dashboard?page=overview"
                        className={`font-medium text-base text-[#646464] hover:underline md:text-[1vw]`}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          text="Sign in"
                          type="stroke"
                          url="/account/sign-in"
                          style="border-[#034AA6] py-3 px-6 transform hover:border-l-[#00CCFF] hover:border-t-[#00CCFF] hover:border-r-[#034AA6] hover:border-b-[#034AA6] md:py-[.7vw] md:px-[1.6vw] md:text-[1vw]"
                        />
                        <Button
                          text="Sign Up"
                          type="background"
                          url="/account/sign-up"
                          style="from-[#00CCFF] to-[#034AA6] py-3 px-6 transform hover:from-[#034AA6] hover:to-[#00CCFF] md:py-[.7vw] md:px-[1.6vw] md:text-[1vw]"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              <button
                onClick={() => setShowDropDown(true)}
                className="block md:hidden"
              >
                <AiOutlineMenu size={32} color="white" />
              </button>
            </div>
          </div>
        </div>
        <MobileNav
          activeLink={activeLink}
          showDropDown={showDropDown}
          setShowDropDown={setShowDropDown}
          auth={auth!}
          removeAuth={removeAuth!}
          user={userExist}
        />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </>
    )
  );
}
