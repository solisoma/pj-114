import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function Options() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Options" />
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
            <h2 className="font-bold text-4xl md:text-6xl">Option Trading</h2>
            <p className="text-xl text-[#7B8EA4]">
              A financial strategy where traders buy or sell contracts giving
              the right, but not the obligation, to buy (call) or sell (put) an
              asset at a set price before a specified date. It’s used for
              hedging, speculation, or income generation.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Option Trading</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="When most people think of investment, they think of buying stocks on the stock market, and many are probably completely unaware of terms like options trading. Buying stocks and holding on to them with a view to making long term gains is after all, one of the more common investment strategies. It's also a perfectly sensible to way invest, providing you have some idea about which stocks you should be buying or use a broker that can offer you advice and guidance on such matters.<br/><br/>This approach is known as a buy and hold strategy and can help you increase your wealth in the long run, but it doesn't provide much, if anything, in the way of short term gains. These days, many investors are choosing to use a more active investment style in order to try and make more immediate returns.<br/><br/>Thanks to the range of online brokers that enable investors to make transactions on the stock exchanges with just a few clicks of their mouse, it's relatively straightforward for investors to be more active if they wish to. There are many people that trade online on either a part time or a full time basis; buying and selling regularly to try and take advantage of shorter term price fluctuations and often holding on to their purchases for just a few weeks or days, or even just a couple of hours."
                  heading="Option Trading & investing"
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/abt.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Options Spreads</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="What really makes trading options such an interesting way to invest is the ability to create options spreads. You can certainly make money trading by buying options and then selling them if you make a profit, but it's the spreads that are the seriously powerful tools in trading. A spread is quite simply when you enter a position on two or more options contracts based on the same underlying security; for example, buying options on a specific stock and also writing contracts on the same stock.<br/><br/>There are many different types of spreads that you can create, and they can be used for many different reasons. Most commonly, they are used to either limit the risk involved with taking a position or reducing the financial outlay required with taking a position. Most options trading strategies involve the use of spreads. Some strategies can be very complicated, but there are also a number of fairly basic strategies that are easy to understand."
                  heading=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Selling & Writing Options</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="There are basically two ways in which you can sell options contracts. First, if you have previously bought contracts and wish to realize your profits, or cut your losses, then you would sell them by placing a sell to close order. The order is named as such because you are closing your position by selling options contracts.<br/><br/>You would usually use that order if the options you owned had gone up in value and you wanted to take your profits at that point, or if the options you owned had fallen in value and you wanted to exit your position before incurring any other losses.<br/><br/>The other way you can sell options is by opening a short position and short selling them. This is also known as writing options, because the process actually involves you writing new contracts to be sold in the market. When you do this you are taking on the obligation in the contract i.e. if the holder chooses to exercise their option then you would have to sell them the underlying security at the strike price (if a call option) or buy the underlying security from them at the strike price (if a put option).<br/><br/>Writing options is done by using the sell to open order, and you would receive a payment at the time of placing such an order. This is generally riskier than trading through buying and then selling, but there are profits to be made if you know what you are doing. You would usually place such an order if you believed the relevant underlying security would not move in such a way that the holder would be able to exercise their option for a profit."
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
