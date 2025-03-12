"use client";
import React, { Suspense, useEffect, useState } from "react";
import { sidenavs } from "@/utils/scaffold";
import AuthGuard from "../auth/AuthGuard";
import { clearSecureStorage } from "@/api/auth";
import { useRouter } from "next/navigation";
import { get_user_status, log_out } from "@/api/default";
import { Bounce, ToastContainer } from "react-toastify";
import Modal from "./Modal";
import "react-toastify/dist/ReactToastify.css";
import { LogOutAction } from "./Utils";
import { ScaffoldType, User } from "./type";
import { NavType } from "@/utils/type";
import { GiHamburgerMenu } from "react-icons/gi";
import PrettyMenu from "./PrettyMenu";
import Link from "next/link";
import { ImSwitch } from "react-icons/im";

function Scaffold({ children, activeLink, route }: ScaffoldType) {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<User>({});
  const [showLogOut, setShowLogoOut] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const router = useRouter();
  const Children = React.cloneElement(children, {
    userId: userDetail.id,
    setUser: setUser,
    userDetail,
    permission: userDetail.permission,
    addProduct,
    refresh: setRefresh,
    setAddProduct,
  });

  async function LogOut() {
    try {
      await log_out();
      await clearSecureStorage();
      localStorage.clear();
      router.push("/account/sign-in");
    } catch {
      // console.log('failed')
    }
  }

  async function setUser() {
    const get_user = await get_user_status();
    setUserDetail(get_user);
    setLoading(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
    document.body.style.padding = "0px";

    setUser();
  }, [refresh]);

  return (
    !loading && (
      <>
        <div className="flex h-screen w-screen">
          <div
            onClick={(e: any) =>
              e.target.id === "parent" && setShowMobileMenu(false)
            }
            id="parent"
            className={`absolute top-0 z-[999] h-full w-full bg-transparent ${
              showMobileMenu ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-700 md:w-[20%] md:translate-x-0 md:static`}
          >
            <div className="bg-background h-full w-[65%] md:w-full px-[1rem] md:px-[1.4vw] border-r">
              <div className="h-[15%] md:py-[.9vw]">
                <a href="/" className="flex justify-center items-center w-full">
                  <img src="/logo.png" className="w-[5rem] h-[5rem]" />
                </a>
              </div>
              <div className="flex h-[83%] flex-col gap-6 md:gap-[2.4vw] overflow-y-scroll remove-scrollbar">
                <div>
                  <div className="flex flex-col gap-4 md:gap-[.3vw]">
                    {sidenavs(userDetail.permission !== "user").map(
                      (nav: NavType, i: number) => (
                        <PrettyMenu
                          key={i}
                          nav={nav}
                          activeLink={activeLink}
                          setShowMobileMenu={setShowMobileMenu}
                          route={route}
                        />
                      )
                    )}
                  </div>
                </div>
                <div
                  onClick={() => {
                    setShowLogoOut(true);
                  }}
                  className={`flex items-center cursor-pointer gap-2 py-1 md:gap-[1.2vw] md:py-[.7vw]`}
                >
                  <ImSwitch size={24} />
                  <p className="md:text-[1rem]">Log Out</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-background3 md:w-[95%] h-full overflow-y-scroll remove-scrollbar">
            <div className="fixed z-[99] top-0 w-full md:w-[82%] flex justify-between items-center bg-background h-[10%] p-6">
              <div className="flex items-center gap-3 md:hidden">
                <Link href="/">
                  <img src="/logo.png" className="md:w-[4vw] w-[3rem]" />
                </Link>
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="flex justify-between items-center gap-3 cursor-pointer"
                >
                  <GiHamburgerMenu className="text-tex" size={24} />
                </button>
                <div className="text-sm text-white font-bold items-center">
                  Hi, {userDetail.name} 👋
                </div>
              </div>
              <div className="hidden text-xl text-white font-bold items-center md:flex">
                Hi, {userDetail.name} 👋
              </div>
              <div className="flex items-center gap-2 md:gap-[.9vw]">
                <div className="font-semibold rounded-full bg-tex2 text-black w-[2rem] h-[2rem] flex items-center justify-center border-2 border-tex2 md:w-[2.5vw] md:h-[2.5vw]">
                  <img src="/user.jpg" className="h-full w-full rounded-full" />
                </div>
              </div>
            </div>
            <div className="pt-[4rem] md:pt-[5rem]">
              <div className="flex justify-center">
                <div className="flex flex-col gap-8 bg-background3 p-4 h-full w-full md:p-[1.3vw] lg:w-[72%]">
                  {Children}
                </div>
              </div>
              <Modal
                show={showLogOut}
                setShow={setShowLogoOut}
                classes="bg-[#1E222D] w-[80%] h-[35%] shadow-2xl md:p-[.1vw] rounded-lg md:w-[20%]"
              >
                <LogOutAction onLogOut={LogOut} />
              </Modal>
            </div>
          </div>
        </div>
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

export default function RenderScaffold({
  children,
  activeLink,
  route,
}: ScaffoldType) {
  return (
    <AuthGuard>
      <Suspense>
        <Scaffold activeLink={activeLink} route={route}>
          {children}
        </Scaffold>
      </Suspense>
    </AuthGuard>
  );
}
