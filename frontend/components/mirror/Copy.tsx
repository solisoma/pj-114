import React from "react";
import Nav from "../nav-section/Nav";
import Footer from "../footer-section/Footer";
import BoxThree from "../BoxThree";

export default function Copy() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Copy trading" />
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
            <h2 className="font-bold text-4xl md:text-6xl">Copy Trading</h2>
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
            <h2 className="font-bold text-4xl">Copy Trading</h2>
            <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
              <div className="flex-1">
                <BoxThree
                  desc="Copy trading is a type of trading where you copy the trades performed by another, more experienced trader. It can be manual, semi-automatic or fully automatic.<br/><br/>Copy trading allows individuals to automatically copy another trader's positions when they are opened or closed. Experienced traders communicate their positions using signals via social networks or forums, where followers can copy the methods.<br/><br/>Traders can copy positions in many markets, including forex, stocks and CFDs. You can also copy trades on popular crypto coins, including Bitcoin (BTC) or major precious metals such as Gold or Platinum.<br/><br/>Copy trading can be a good way to earn a profit and make you rich, but it is important to understand that you will not become rich overnight. If you try to become rich too fast, you will have to copy very high-risk trades, and you will likely end up losing your money. If you use copy trading to build wealth slowly, you will have a fair chance of becoming a millionaire in due time."
                  heading="Copy trading is replicating another trader's positions using social platforms, automated tools and signals"
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
                  desc="Authorised practice - copy trading is generally recognised by key regulatory frameworks, including CySEC, ESMA, MiFID and the FCA. Choosing a licensed and reputable broker will ensure your funds are safe and not exposed to scams.<br/><br/>Portfolio diversification - traders can gain exposure to opportunities or trends that they wouldn't usually consider without the help of another trader's expertise."
                  heading="PROS"
                />
              </div>
              <div className="w-full lg:w-[49%]">
                <BoxThree
                  desc="Risk - the risks can be high even if you choose an experienced trader to copy. If a strategy is unsuccessful, the risk will also translate onto a follower's account and can result in a financial loss.<br/><br/>Control - one of the main disadvantages is the lack of control a trader will have once they begin copying an account; traders are essentially entrusting their portfolio to a stranger."
                  heading="CONS"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Risk</h2>
            <div className="flex gap-4 items-stretch">
              <div className="w-full">
                <BoxThree
                  desc="All types of trading are associated with risk. You always risk losing part or all of your investment. Never invest money you can not afford to lose. The risk associated with copy trading depends on the type of asset or security you choose to copy trade. Copying the trades of a trader that trades high-risk assets such as Forex, Crypto or binary options will be high risk. Copying the trades of a trader that trades low-risk securities such as blue chip stocks will be low risk.<br/><br/>You should follow a trader that trades using a risk profile that you feel comfortable with. Many platforms will give you a risk indicator for each trader you can choose to copy, but it is always best to manually inspect their trade history and see if you feel comfortable with their trading strategies and risk profile. When in doubt, choose a broker with a lower-risk profile. You can increase your risk exposure later on, but if you choose a high-risk strategy and lose money, it will be too late to move that money to a lower-risk option since the money is already lost.<br/><br/>A common beginner's mistake is only copying one trader. A profitable trading history does not guarantee future returns. All traders can produce a period of poor returns or losses. It is always best to split your money and follow more than one trader. This will give you better diversification and will allow you to earn a profit even if one trader has a bad month or year. Diversification will reduce the risk associated with all types of trading and is one of the most basic types of risk management. All beginner traders should try to diversify their investment portfolio."
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
