"use client";
import React, { useEffect, useRef, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa";
import {
  IoIosInformationCircleOutline,
  IoMdTrendingDown,
} from "react-icons/io";
import Box from "../Box";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import { AiFillRobot } from "react-icons/ai";
import { TnxTable } from "../TnxTable";
import { User } from "../type";
import { MultiType } from "@/api/type";
import { get_trxs } from "@/api/transactions";
import Modal from "../Modal";
import { Deposit } from "../Deposit";
import { Withdraw } from "../Withdraw";

export function setScript(ref: any, src: string, innerHTML: any) {
  // Clear the container before appending
  if (ref.current) {
    (ref.current as any).innerHTML = "";
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.innerHTML = JSON.stringify(innerHTML);
  // Append the script to the container
  if (ref.current) {
    (ref.current as any).appendChild(script);
  }
}

export default function Overview({
  userDetail,
  setUser,
}: {
  userDetail?: User;
  setUser?: () => void;
}) {
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [transactions, setTransactions] = useState<MultiType[] | null>();
  const [showLogOut, setShowLogoOut] = useState(false);
  const [action, setAction] = useState("deposit");
  const containerRef = useRef(null);
  const coverRef = useRef(null);
  const symbolRef = useRef(null);
  const symbolRef2 = useRef(null);
  const symbolRef3 = useRef(null);
  const symbolRef4 = useRef(null);

  function handleScroll(e: any) {
    const scrollPosition = e.target.scrollLeft;
    const picturesWidth = e.target.scrollWidth - e.target.clientWidth;
    const index = Math.floor((scrollPosition / picturesWidth) * (3 - 1));
    setDotIndex(index);
  }

  function handleScrollClick(key: number) {
    if (coverRef.current) {
      const scrollPosition = key * (coverRef.current as any).offsetWidth;
      (coverRef.current as any).scroll({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  async function getTrxs() {
    const trxs = await get_trxs(true);
    setTransactions(trxs);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Call scrollToTop() wherever needed, such as on a button click or route change.

  useEffect(() => {
    // scrollToTop();
    getTrxs(); // Get transactions
    setScript(
      containerRef,
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
      {
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      }
    );
    setScript(
      symbolRef,
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
      {
        symbol: "COINBASE:BTCUSD",
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
      }
    );
    setScript(
      symbolRef2,
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
      {
        symbol: "COINBASE:ETHUSD",
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
      }
    );
    setScript(
      symbolRef3,
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
      {
        symbol: "COINBASE:SOLUSD",
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
      }
    );
    setScript(
      symbolRef4,
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js",
      {
        feedMode: "all_symbols",
        isTransparent: false,
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: "dark",
        locale: "en",
      }
    );
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="tradingview-widget-container">
            <div
              ref={containerRef}
              className="tradingview-widget-container__widget"
            ></div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-4 justify-between md:gap-8">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="rounded-full w-[3rem] h-[3rem] border-2 border-background2 p-1 md:w-[4vw] md:h-[4vw]">
                  <img src="/user.jpg" className="h-full w-full rounded-full" />
                </div>
                <div className="flex items-center">
                  <p className="text-[14px] md:text-normal">
                    Here's a summary of your account. Have fun!
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6">
                <button
                  onClick={() => {
                    setAction("deposit");
                    setShowLogoOut(true);
                  }}
                  className="flex gap-2 rounded-lg items-center bg-background2 px-4 py-2"
                >
                  <TbHomeDollar size={20} />
                  <p>Deposit</p>
                </button>
                <button
                  onClick={() => {
                    setAction("withdraw");
                    setShowLogoOut(true);
                  }}
                  className="flex gap-2 rounded-lg items-center bg-[#10BD9D] px-4 py-2"
                >
                  <FaCreditCard size={20} color="" />
                  <p>Withdraw</p>
                </button>
              </div>
            </div>
            <div>
              <img src="/welcome-bg.svg" />
            </div>
          </div>
          {!userDetail!.isVerified && (
            <div className="flex flex-col items-center rounded-lg p-2 bg-[#FA896B] md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-2">
                <IoIosInformationCircleOutline />
                <p className="text-[13px] md:text-normal">
                  Verify KYC Information to activate withdrawals
                </p>
              </div>
              <div>
                <a
                  href="/dashboard?page=kyc"
                  className="flex gap-2 rounded-lg items-center bg-white px-4 py-2"
                >
                  <p className="text-[#FA896B]">
                    {userDetail!.front_image ? "Pending" : "Verify KYC"}
                  </p>
                </a>
              </div>
            </div>
          )}
          <div
            onScroll={handleScroll}
            ref={coverRef}
            className="flex gap-2 snap-x snap-mandatory overflow-x-scroll items-stretch remove-scrollbar h-[30vh] md:h-[20vh]"
          >
            <div className="min-w-full rounded-lg snap-start tradingview-widget-container md:min-w-[33%]">
              <div
                ref={symbolRef}
                className="h-full tradingview-widget-container__widget"
              ></div>
            </div>
            <div className="min-w-full h-full rounded-lg snap-start tradingview-widget-container md:min-w-[33%]">
              <div
                ref={symbolRef2}
                className="h-full tradingview-widget-container__widget"
              ></div>
            </div>
            <div className="min-w-full h-full rounded-lg snap-start tradingview-widget-container md:min-w-[33%]">
              <div
                ref={symbolRef3}
                className="h-full tradingview-widget-container__widget"
              ></div>
            </div>
          </div>
          <div className="flex justify-center gap-2 py-3 md:hidden">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                onClick={() => handleScrollClick(i)}
                className={`p-1 rounded-full ${
                  dotIndex === i ? "bg-[#3346D3]" : "bg-[#D8D8D8]"
                } cursor-pointer`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Box
            heading="Available Balance"
            desc={String(Number(userDetail!.balance))}
          />
          <Box
            heading="Total Deposit"
            desc={String(Number(userDetail!.totalDeposits))}
          />
          <Box
            heading="Total Withdraw"
            desc={String(Number(userDetail!.totalWithdrawals))}
          />
        </div>
        <div className="flex items-center justify-between bg-[#E6FFFA] px-4 py-6 rounded-lg">
          <div className="flex gap-2 items-center">
            <MdAccountBalanceWallet size={34} color="#13DEB9" />
            <h2 className="font-semibold text-xm text-black">TOTAL PROFIT</h2>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-xl text-[#FA896B]">
              $
              {Number(
                userDetail!.balance -
                  (userDetail!.totalDeposits - userDetail!.totalWithdrawals)
              )}
            </p>
            <div className="flex gap-1">
              <IoMdTrendingDown size={24} color="red" />
              <IoMdTrendingUp size={24} color="green" />
            </div>
          </div>
        </div>
        <div className="p-8 border rounded-lg">
          <a
            href="#"
            className="flex flex-col items-center gap-4 bg-[#F6F9FC] py-4"
          >
            <AiFillRobot size={50} color="black" />
            <h2 className="font-bold text-3xl text-black">Bot</h2>
            <p className="text-sm text-black">
              Feature coming soon stay tuned!!
            </p>
          </a>
        </div>
        <div className="flex flex-col gap-4 md:justify-between items-stretch md:flex-row">
          <div className="w-full md:w-[30%]">
            <div className="tradingview-widget-container h-[55vh]">
              <div
                ref={symbolRef4}
                className="tradingview-widget-container__widget h-full"
              ></div>
            </div>
          </div>
          <div className="w-full md:w-[70%] max-h-[55vh]">
            <TnxTable tableData={transactions || []} />
          </div>
        </div>
      </div>

      <Modal
        show={showLogOut}
        setShow={setShowLogoOut}
        classes="bg-[#1E222D] w-[90%] h-auto shadow-2xl md:p-[.1vw] rounded-lg md:w-[35%]"
      >
        {action === "deposit" ? (
          <Deposit />
        ) : (
          <Withdraw onAction={getTrxs} balance={userDetail!.balance} />
        )}
      </Modal>
    </>
  );
}
