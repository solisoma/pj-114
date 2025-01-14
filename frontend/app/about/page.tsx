import BoxThree from "@/components/BoxThree";
import Footer from "@/components/footer-section/Footer";
import Nav from "@/components/nav-section/Nav";
import { boxThreeDeet } from "@/utils/about";
import React from "react";

export default function page() {
  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="About Us" />
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
            <h2 className="font-bold text-6xl">About Us</h2>
            <p className="text-xl text-[#7B8EA4]">
              Noble Trades has been sharing financial freedom with traders since
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
          <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
            <div className="flex-1">
              <BoxThree
                desc="Trading will bring you profit with proper support, constant education, and a reasonable approach. Noble Trades is a broker platform that has created all the conditions to help you improve your trading life in every possible way.<br/><br/>From educational broker's tools, demo accounts, and 24/7 support to your financial success, Noble Trades works tirelessly to remain at the forefront in trading online. Join now! Take full advantage of this online trading leader and make your way into the world of professional trading.<br/><br/>Our people are our greatest asset - we say it often and with good reason. It is only with the determination and dedication of our people that we can serve our clients, generate long-term value for our shareholders and contribute to the broader public. At every step of our employees careers we invest in them, and ensure their interests remain focused on the long term and closely aligned with those of our clients and shareholders.."
                heading="Time to take action with the international Noble Trades broker"
              />
            </div>
            <div className="flex-1 rounded-lg flex min-h-[30vh]">
              <img src="/abt.jpg" className="w-full h-full rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Our Values</h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              {boxThreeDeet.map((item, i) => (
                <div key={i} className="w-full lg:w-[49%]">
                  <BoxThree
                    desc={item.desc}
                    heading={item.heading}
                    bgImg="bg-[url('/R.png')]"
                    bg={item.bg}
                    txtColor={item.txtColor}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-[3rem] md:justify-between md:flex-row">
            <div className="flex-1 rounded-lg flex justify-center bg-black items-center min-h-[30vh]">
              <img src="/clans-logo.png" className="w-[30%]" />
            </div>
            <div className="flex-1">
              <BoxThree
                desc="We seek to manage risk in order to capitalize on opportunities and improve our performance. Disciplined risk estimation and management are deeply integrated components of the investment process across each one of our strategies. We believe a well-constructed portfolio upfront will outperform in good markets and protect our client's capital in difficult markets. For this reason, algorithm stock trade has spent over a quarter of a century establishing risk management as a core discipline. This approach begins with a dedicated governance group that oversees risk management. An emphasis on liquid markets, proprietary risk models and a diversified funding structure seeks to further strengthen our approach.<br/><br/>At algorithm stock trade, we advance sustainable economic growth and financial opportunity. Drawing on over eight years of experience working with the world's leading businesses, entrepreneurs, and institutions, we mobilize our people, culture, technologies, and ideas to advance the success of our clients, broaden individual prosperity, and accelerate economic progress for all. Our purpose comes to life through our four core values: Client Service, Excellence, Integrity, and Partnership."
                heading="RISK MANAGEMENT AT THE CENTER"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
