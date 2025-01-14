import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function Advanced() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Advanced trading account above PDT" />
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
              Advanced Trading Account
            </h2>
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
            <h2 className="font-bold text-4xl">Advanced Trading Account</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="Advanced Trading Account also referred to as mechanical trading systems, algorithmic trading, automated trading or system trading � allow traders to establish specific rules for both trade entries and exits that, once programmed, can be automatically executed via a computer. In fact, various platforms report 70% to 80% or more of shares traded on U.S. stock exchanges come from automatic trading systems.<br/><br/>Traders and investors can turn precise entry, exit, and money management rules into automated trading systems that allow computers to execute and monitor the trades. One of the biggest attractions of strategy automation is that it can take some of the emotion out of trading since trades are automatically placed once certain criteria are met.<br/><br/>The trade entry and exit rules can be based on simple conditions such as a moving average crossover or they can be complicated strategies that require a comprehensive understanding of the programming language specific to the user's trading platform. They can also be based on the expertise of a qualified programmer."
                  heading="Advanced Trading Account / Mechanical trading systems"
                />
              </div>
              <div className="flex-1 rounded-lg flex min-h-[30vh]">
                <img src="/abt.jpg" className="w-full h-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">
              Advantages of Automated Systems
            </h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc={`Automated trading systems minimize emotions throughout the trading process. By keeping emotions in check, traders typically have an easier time sticking to the plan. Since trade orders are executed automatically once the trade rules have been met, traders will not be able to hesitate or question the trade. In addition to helping traders who are afraid to "pull the trigger," automated trading can curb those who are apt to overtrade � buying and selling at every perceived opportunity.`}
                  heading="MINIMIZING EMOTIONS"
                />
              </div>
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc={`Backtesting applies trading rules to historical market data to determine the viability of the idea. When designing a system for automated trading, all rules need to be absolute, with no room for interpretation. The computer cannot make guesses and it has to be told exactly what to do. Traders can take these precise sets of rules and test them on historical data before risking money in live trading. Careful backtesting allows traders to evaluate and fine-tune a trading idea, and to determine the system's expectancy � i.e., the average amount a trader can expect to win (or lose) per unit of risk.`}
                  heading="BACKTESTING"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="Although appealing for a variety of reasons, automated trading systems should not be considered a substitute for carefully executed trading. Technology failures can happen, and as such, these systems do require monitoring. Server-based platforms may provide a solution for traders wishing to minimize the risks of mechanical failures. Remember, you should have some trading experience and knowledge before you decide to use automated trading systems."
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
