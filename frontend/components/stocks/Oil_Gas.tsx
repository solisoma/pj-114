import React from "react";
import BoxThree from "../BoxThree";
import Footer from "../footer-section/Footer";
import Nav from "../nav-section/Nav";

export default function Oil_Gas() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Oil and gas" />
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
            <h2 className="font-bold text-4xl md:text-6xl">Oil and Gas</h2>
            <p className="text-xl text-[#7B8EA4]">
              Natural gas is turning out to be one of the more popular petroleum
              fuels in the world right now. This is because when compared to
              gasoline, diesel, or kerosene, natural gas produces far less
              carbon dioxide and few other pollutants such as sulfur dioxide.
              This is part of the reason why the U.S. - one of the world's
              largest energy consumers - has shifted its energy production to
              natural gas in a bid to reduce carbon dioxide emissions while
              still exploiting the massive energy generation potential of
              petroleum products
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Oil and Gas Trading</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="While petroleum was still the largest, it was used mostly for transportation purposes, as natural gas was the dominant fuel of choice in residential, industrial, and commercial use cases. Within the electricity sector, natural gas also led the pack and accounted for 32% of the total usage, and overall, natural gas accounted for 36% of the U.S. primary energy production. Finally, U.S. natural gas production also outstripped usage in 2021.<br/><br/>The top-performing oil and gas stocks in the past year include TORM PLC, Teekay Tankers, and Scorpio Tankers. Despite oil prices dropping significantly from their peaks recorded nearly a year ago, these companies have seen their shares rise by well over 100% in the past year, handily beating the 9% drop in the Russell 1000 Index.<br/><br/>Oil and gas stocks as a group, measured by the benchmark Energy Select Sector SPDR ETF (XLE), have climbed by 10% in the past year, outperforming the broader market. However, declining oil and gas prices in the second half of 2022 and into 2023 could pressure margins and revenues in the sector."
                  heading="Data from the Energy Information Administration (EIA) shows that natural gas was the second most widely fuel in the U.S., accounting for 32% of the energy consumption in 2021."
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/oil.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">
              Advantages of Oil and Gas Stocks
            </h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc="Inflation/Interest Rates Hedge: Historically, rising inflation has been correlated with higher oil prices, offering investors a potential portfolio hedge by investing in oil and gas stocks. Typically, the Federal Reserve raises interest rates to tackle inflation, aiming to lower consumer demand. According to Bob Iaccino, co-founder of Path Trading Partners, the price of West Texas Intermediate (WTI) crude contracts over the past six rate-tightening cycles has risen by an average of 16.06% six months after each rate hike.<br/><br/>Tax Advantages: Investing in oil and gas stocks provides investors and producers with a range of unique tax benefits. Some key advantages include the favorable way active and passive income is treated and the deduction of certain drilling and lease costs. For instance, the Internal Revenue Service (IRS) tax code considers earnings from oil and gas royalties as passive income while categorizing net losses as active income. This may enable some investors to offset their production revenue losses from other forms of income, such as capital gains."
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
            <h2 className="font-bold text-4xl">Tactics</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="Finally, the global natural gas market was estimated to be worth $955 billion in 2022 and will grow at a compounded annual growth rate (CAGR) of 7.3% this year to be worth a little over $1 trillion by the end of 2023 according to The Business Research Company. From 2023 until 2027, the industry is expected to exhibit a CAGR of 7.5% and be worth $1.3 trillion. Some of the top profitable natural gas companies part of our list today are Public Joint Stock Company Gazprom (MCX:GAZP.ME), Coterra Energy Inc. (NYSE:CTRA), and Tourmaline Oil Corp. (OTCMKTS:TRMLF)."
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
