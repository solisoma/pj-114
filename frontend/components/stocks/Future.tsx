import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function Future() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Futures" />
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
            <h2 className="font-bold text-4xl md:text-6xl">Future Trading</h2>
            <p className="text-xl text-[#7B8EA4]">
              Futures are derivative contracts to buy or sell an asset at a
              future date at an agreed-upon price.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Future Trading</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="Commodities represent a big part of the futures-trading world. Stock futures investing lets you trade futures of individual companies and shares of ETFs.<br/><br/>Futures contracts also exist for bonds and even bitcoin. Some traders like trading futures because they can take a substantial position (the amount invested) while putting up a relatively small amount of cash. That gives them greater potential for leverage than just owning the securities directly.<br/><br/>Most investors think about buying an asset anticipating that its price will go up in the future. But short-selling lets investors do the opposite � borrow money to bet an asset's price will fall so they can buy later at a lower price.<br/><br/>One common application for futures relates to the U.S. stock market. Someone wanting to hedge exposure to stocks may short-sell a futures contract on the Standard & Poor�s 500. If stocks fall, they make money on the short, balancing out their exposure to the index. Conversely, the same investor may feel confident in the future and buy a long contract � gaining a lot of upside if stocks move higher."
                  heading="Stock futures investing"
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/abt.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">What are futures contracts?</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="Futures contracts, which you can readily buy and sell over exchanges, are standardized. Each futures contract will typically specify all the different contract parameters:<br/><br/>The unit of measurement.<br/><br/>How the trade will be settled � either with physical delivery of a given quantity of goods, or with a cash settlement.<br/><br/>The quantity of goods to be delivered or covered under the contract.<br/><br/>The currency in which the futures contract is quoted.<br/><br/>Grade or quality considerations, when appropriate. For example, this could be a certain octane of gasoline or a certain purity of metal."
                  heading=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">
              The risks of futures trading: margin and leverage
            </h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="Many speculators borrow a substantial amount of money to play the futures market because it's the main way to magnify relatively small price movements to potentially create profits that justify the time and effort.<br/><br/>But borrowing money also increases risk: If markets move against you, and do so more dramatically than you expect, you could lose more money than you invested. The CFTC warns that futures are complex, volatile, and not recommended for individual investors.<br/><br/>Leverage and margin rules are a lot more liberal in the futures and commodities world than they are for the securities trading world. A commodities broker may allow you to leverage 10:1 or even 20:1, depending on the contract, much higher than you could obtain in the stock world. The exchange sets the rules.<br/><br/>The greater the leverage, the greater the gains, but the greater the potential loss, as well: A 5% change in prices can cause an investor leveraged 10:1 to gain or lose 50 percent of her investment. This volatility means that speculators need the discipline to avoid overexposing themselves to any undue risk when investing in futures.."
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
