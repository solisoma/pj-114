"use client";

import BoxOne from "@/components/BoxOne";
import BoxThree from "@/components/BoxThree";
import BoxTwo from "@/components/BoxTwo";
import Container from "@/components/Container";
import Footer from "@/components/footer-section/Footer";
import Nav from "@/components/nav-section/Nav";
import PlanBox from "@/components/PlanBox";
import {
  boxOneDeet,
  boxThreeDeet,
  boxThreeDeet2,
  boxThreeDeet3,
  boxTwoDeet,
  boxTwoDeet2,
  plans,
  tabs,
} from "@/utils/home";
import { useRef, useState } from "react";
import { TbWorld } from "react-icons/tb";

export default function Home() {
  const [info, setInfo] = useState<
    { name: string; desc: string; offers: string[] }[]
  >(plans.Standard);
  const [activeTab, setActiveTab] = useState("Standard");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const containerRef = useRef(null);

  function handleScroll(e: any) {
    const scrollPosition = e.target.scrollLeft;
    const picturesWidth = e.target.scrollWidth - e.target.clientWidth;
    const index = Math.floor(
      (scrollPosition / picturesWidth) * (info.length - 1)
    );
    setDotIndex(index);
  }

  function handleScrollClick(key: number) {
    if (containerRef.current) {
      const scrollPosition = key * (containerRef.current as any).offsetWidth;
      (containerRef.current as any).scroll({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <div className="fixed top-0 pt-2 left-0 w-full shadow-md bg-[#0a0a0a] z-10">
        <div className="flex justify-center w-full">
          <div className="w-full lg:w-[70%]">
            <Nav activeLink="Home" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-8 px-4 pt-[5rem] w-full md:px-10 md:pt-[6rem] lg:w-[72%]">
          <div className="relative">
            <video
              src="/bg-1.mp4"
              className="h-[70vh] w-full object-cover md:h-auto"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60">
              <div className="flex items-end h-[90%] px-2 w-full md:h-[78%] md:px-8">
                <div className="flex flex-col w-full gap-2 md:w-[40%]">
                  <h2 className="font-bold text-4xl">
                    Growing Profits Together
                  </h2>
                  <p className="font-base text-[#7B8EA4] text-xl">
                    Empowering Your Trading Journey to Achieve Financial Success
                    Guiding you with the tools and support to trade smarter and
                    succeed financially.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">About Us</h2>
            <Container
              heading="Time to take action with the international Noble broker"
              btn={false}
              imgSrc="/about-img.jpg"
              desc="Trading will bring you profit with proper support, constant education, and a reasonable approach. Noble is a broker platform that has created all the conditions to help you improve your trading life in every possible way.<br/><br/>From educational broker's tools, demo accounts, and 24/7 support to your financial success, Noble works tirelessly to remain at the forefront in trading online. Join now! Take full advantage of this online trading leader and make your way into the world of professional trading."
            />
          </div>
          <div className="flex flex-col gap-4 lg:justify-between lg:flex-row">
            <div className="flex-1 h-full">
              <BoxOne
                bg="bg-[url('/world-img.webp')] bg-cover"
                Icon={TbWorld}
                heading="130+ countries"
                desc="We support all, so traders from all over the world could enjoy and profit anytime"
              />
            </div>
            <div className="flex-1 flex flex-wrap gap-4 items-stretch">
              {boxOneDeet.map((item, i) => (
                <div key={i} className="w-full lg:w-[18rem]">
                  <BoxOne
                    Icon={item.Icon}
                    heading={item.heading}
                    desc={item.desc}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Mirror Trading</h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              {boxTwoDeet.map((item, i) => (
                <div key={i} className="w-full lg:w-[49%]">
                  <BoxTwo
                    imgSrc={item.imgURL}
                    desc={item.desc}
                    url={item.url}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Stocks</h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              {boxTwoDeet2.map((item, i) => (
                <div key={i} className="w-full lg:w-[49%]">
                  <BoxTwo
                    imgSrc={item.imgURL}
                    desc={item.desc}
                    url={item.url}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Find Yourself on Noble</h2>
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
            <div className="flex justify-center">
              <a
                href="/dashboard?page=overview"
                className="p-[.8rem] bg-[#0094FF] rounded-lg"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">
              Our Asset Management Solutions
            </h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              {boxThreeDeet2.map((item, i) => (
                <div key={i} className="w-full lg:w-[49%]">
                  <BoxThree desc={item.desc} heading={item.heading} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-4xl">Trade on any device</h2>
            <p className="text-[#9AADBF]">
              Achieve your financial ambitions on any device, anywhere, anytime
            </p>
            <a href="https://www.tradingview.com/">
              Track all markets on TradingView
            </a>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="font-bold text-4xl">Trading at your fingertips</h2>
            <p className="text-[#9AADBF]">
              New features, latest webinars and more...
            </p>
            <Container
              heading="Powerful Trading Platforms to help you succeed"
              btn={false}
              bg="bg-white"
              txtColor="text-black"
              imgSrc="/learn.jpg"
              desc="Clients in over 200 countries and territories trade stocks, options, futures, currencies, bonds, funds and more on 150 global markets from a single unified platform.<br/><br/>Spot opportunities and calibrate complete portfolio performance. Keep your performance track record with PortfolioAnalyst inception reporting and historical aggregation at no cost.<br/><br/>Our mission is to bring advanced portfolio analytics to everyone who needs them � both professionals and individuals. The best way to do that is to offer them at no cost, with no strings."
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">CHAMBERS LEVEL</h2>
            <p className="text-[#9AADBF]">
              Chambers level, is the target level for an expert trader that is
              affiliated with us to get up to in a year. This level comprises of
              50+ members only for further information about this level will be
              discussed with your trader.
            </p>
            <span className="border-b-4 border-white" />
            <p>
              Benefits:
              <br /> Streaming live with your trader Getting your portfolio up
              to Millions Learning from other chamber's investors across the
              countries
            </p>
            <span className="border-b-4 border-white" />
          </div>
          <div>
            <div className="flex justify-center">
              <div className={`py-4 rounded-lg text-[#7F8698]`}>
                {tabs.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(item);
                      setInfo(plans[item]);
                    }}
                    className={`px-2 py-1 border ${
                      activeTab === item
                        ? "border-[#0043ED] bg-[#DEE7FF] text-[#0043ED]"
                        : "bg-white"
                    } 
                    ${i === 0 && "rounded-l-lg"} 
                    ${i === tabs.length - 1 && "rounded-r-lg"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div
              onScroll={handleScroll}
              ref={containerRef}
              className="flex gap-8 w-full snap-x py-3 snap-mandatory items-stretch md:flex-wrap overflow-x-scroll remove-scrollbar"
            >
              {info.map((item, i) => (
                <div key={i} className="min-w-full md:min-w-[30%] snap-start">
                  <PlanBox
                    name={item.name}
                    desc={item.desc}
                    offers={item.offers}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 py-3 md:hidden">
              {info.map((_, i) => (
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
          <div className="flex flex-col gap-8 mb-8">
            <h2 className="font-bold text-4xl">Become a Pro Trader</h2>
            <div className="flex flex-wrap gap-4 items-stretch">
              {boxThreeDeet3.map((item, i) => (
                <div key={i} className="w-full lg:w-[49%]">
                  <BoxThree
                    desc={item.desc}
                    heading={item.heading}
                    bgImg="bg-[url('/R.png')]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
