import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function LiveTrading() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Live trading interface" />
          </div>
        </div>
      </div>
      <div className="relative w-full mt-[7rem]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/about-us.jpg')]"></div>

        {/* Semi-Transparent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#02082D] to-[#081C49] opacity-80"></div>
        <div className="relative flex justify-center">
          <div className="flex flex-col gap-8 px-4 py-[5rem] w-full md:px-10 lg:w-[72%]">
            <h2 className="font-bold text-4xl md:text-6xl">
              Live Trading Interface
            </h2>
            <p className="text-xl text-[#7B8EA4]">
              Cinpax Trade trading platform is a software system offered to
              investors and traders by certain financial institutions, such as
              brokerages and banks. Essentially, trading platforms enable
              investors and traders to place trades and monitor their accounts.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Live Trading Interface</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="Trading platforms can offer a number of other features, as well. Broadly speaking, these include real-time quotes, live business and financial news feeds, instant access to a wealth of streaming and historical financial data, technical analysis tools, investment research, and educational resources.<br/><br/>There are two types of trading platforms: commercial platforms and proprietary platforms. Commercial platforms are designed for day traders and retail investors. They are characterized by ease of use and an assortment of helpful features, such as real-time quotes, international news feeds, live, interactive charts, educational content, and research tools."
                  heading="Essentially, a trading platform is a software system typically offered through a brokerage or other financial institution that lets you trade online, on your own. A trading platform gives investors an online interface through which they can access various markets, place trades, monitor positions, and manage their accounts."
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/abt.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="Trading Strategy: Traders create rules for entering, exiting, and managing trades to stay consistent and disciplined.<br/><br/>Market Monitoring: They track price movements, news, and volumes using real-time data.<br/><br/>Opportunity Evaluation: Traders spot opportunities by analyzing patterns, trends, and key price levels.<br/><br/>Trade Execution: They act quickly using market or limit orders to capture short-term gains.<br/><br/>Risk Management: Tools like stop-loss orders and position sizing help limit losses.<br/><br/>Closing Positions: All trades are closed daily to avoid overnight risks."
                  heading="Why our live trading interface is important"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Swing Trading Tactics</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="The key factors necessary to succeed in day trading are fast, reliable execution of trades and the lowest possible trading commissions. A day trader can have a majority of winning trades, yet still lose money at the end of the day if their commissions outweigh their profits. Since day traders are continually buying and selling assets, they may rack up substantial costs in the form of trading commissions.<br/><br/>Similarly, optimal execution of orders is essential. Getting in and out of the market and taking small profits continually throughout the day requires efficient order execution. During fast-moving market conditions, such as at the market open or just after an important piece of news has been released, it�s especially important to be working with a broker that can provide reliable order execution."
                  heading=""
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-[3rem] font-semibold text-xl text-[#7B8EA4]">
            <p>Quick and easy deposits and withdrawals</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
