import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function Swing() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Swing trading" />
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
            <h2 className="font-bold text-4xl md:text-6xl">Swing Trading</h2>
            <p className="text-xl text-[#7B8EA4]">
              Cinpax Trade has been sharing financial freedom with traders since
              2014. In a continuous effort to give traders a more comfortable
              and safe experience, its experts have been improving the platform
              ensuring traders can enjoy and make use of that freedom to trade
              whenever and wherever they like.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Swing Trading</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="Swing trading is a style of trading that attempts to capture short- to medium-term gains in a stock (or any financial instrument) over a period of a few days to several weeks. Swing traders primarily use technical analysis to look for trading opportunities.<br/><br/>Many swing traders assess trades on a risk/reward basis. By analyzing the chart of an asset, they determine where they will enter, where they will place a stop-loss order, and then anticipate where they can get out with a profit. If they are risking $1 per share on a setup that could reasonably produce a $3 gain, that is a favorable risk/reward ratio. On the other hand, risking $1 only to make $0.75 isn't quite as favorable."
                  heading="Swing trading is one of the most popular forms of active trading, where traders look for intermediate-term opportunities using various forms of technical analysis."
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/abt.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Pros and Cons</h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc="Swing trading requires less time to trade than day trading.<br/><br/>It maximizes short-term profit potential by capturing the bulk of market swings.<br/><br/>Swing traders can rely exclusively on technical analysis, simplifying the trading process."
                  heading="PROS"
                />
              </div>
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc="Swing trade positions are subject to overnight and weekend market risk.<br/><br/>Abrupt market reversals can result in substantial losses.<br/><br/>Swing traders often miss longer-term trends in favor of short-term market moves."
                  heading="CONS"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Swing Trading Tactics</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="A swing trader tends to look for multiday chart patterns. Some of the more common patterns involve moving average crossovers, cup and handle patterns, head and shoulders patterns, flags, and triangles. Key reversal candlesticks may be used in addition to other indicators to devise a solid trading plan.<br/><br/>Ultimately, each swing trader devises a plan and strategy that gives them an edge over many trades. This involves looking for trade setups that tend to lead to predictable movements in the asset�s price. This isn�t easy, and no strategy or setup works every time. With a favorable risk/reward, winning every time isn't required. The more favorable the risk/reward of a trading strategy, the fewer times it needs to win to produce an overall profit over many trades."
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
