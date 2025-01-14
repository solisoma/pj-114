import { IconType } from "react-icons";
import { FiUser } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { TbReload } from "react-icons/tb";
import { IoIosCloudDownload } from "react-icons/io";

export const boxOneDeet: { desc: string; heading: string; Icon: IconType }[] = [
  { desc: "Trader accounts", heading: "1M+", Icon: FiUser },
  { desc: "Monthly transactions", heading: "30M+", Icon: BiTransfer },
  {
    desc: "Average monthly payouts",
    heading: "$16M+",
    Icon: IoIosCloudDownload,
  },
  { desc: "Monthly trade turnover", heading: "$211M", Icon: TbReload },
];

export const boxTwoDeet: { imgURL: string; desc: string; url: string }[] = [
  {
    url: "mirror/copy",
    imgURL: "/mir-1.jpg",
    desc: "Copy Trading<br/>Copy trading lets you mimic the trades of experienced traders, making it easier for beginners to invest successfully. It’s simple but depends on choosing the right traders to follow.",
  },
  {
    url: "mirror/advance",
    imgURL: "/mir-2.jpg",
    desc: "Advance Trading<br/>Advanced trading uses tools and strategies like technical analysis, algorithmic trading, and risk management. It requires market knowledge and precision to maximize returns.",
  },
  {
    url: "mirror/live-trading",
    imgURL: "/mir-3.jpg",
    desc: "CryptoCurrency Market<br/>The cryptocurrency market is a global, 24/7 space for trading digital assets like Bitcoin and Ethereum. It offers high potential but comes with risks like volatility and security concerns.",
  },
];

export const boxTwoDeet2: { imgURL: string; desc: string; url: string }[] = [
  {
    url: "stocks/swings",
    imgURL: "/stock-1.jpg",
    desc: "",
  },
  {
    url: "stocks/futires",
    imgURL: "/stock-2.jpg",
    desc: "Futures<br/>Futures are contracts to buy or sell an asset at a predetermined price on a future date. Commonly used in commodities and financial markets, they help traders hedge risks or speculate on price movements.",
  },
  {
    url: "stocks/options",
    imgURL: "/stock-3.jpg",
    desc: "Option<br/>Options are financial instruments giving the buyer the right, but not the obligation, to buy or sell an asset at a set price within a specific timeframe. They are versatile tools for hedging and speculative trading.",
  },
  {
    url: "stocks/oilandgas",
    imgURL: "/stock-4.jpg",
    desc: "Oil and Gas<br/>The oil and gas industry involves exploration, extraction, refining, and distribution of petroleum and natural gas. It plays a critical role in global energy supply, with its market affected by geopolitical events, demand shifts, and environmental policies.",
  },
];

export const boxThreeDeet: {
  heading: string;
  desc: string;
  txtColor: string;
  bg: string;
}[] = [
  {
    bg: "bg-black",
    txtColor: "",
    heading: "Clear Investment Processes",
    desc: "Our transparent investment processes detail how each investment team identifies and implements investment opportunities and the risk/return profile to be expected. We believe that strict adherence to these guidelines is one of the most effective forms of risk management.",
  },
  {
    bg: "bg-white",
    txtColor: "text-black",
    heading: "ESG Integration",
    desc: "As a signatory of the United Nations-supported Principles for Responsible Investment (UN PRI) initiative, we're committed to investing responsibly and supported by a global team of dedicated ESG specialists whose recommendations help shape the investment process.",
  },
  {
    bg: "bg-black",
    txtColor: "",
    heading: "Robust Oversight",
    desc: "Portfolio risk management is supplemented by our independent risk and quantitative analytics team which partners with investment teams to measure behavioral biases and other risks but reports to senior investment management and an operational risk management function that assesses risk across the complex.",
  },
  {
    bg: "bg-white",
    txtColor: "text-black",
    heading: "High-Conviction, Risk-Aware Portfolios",
    desc: "Our focus on proprietary, security-level research allows us to build high-conviction, differentiated portfolios. Our risk management processes provide valuable insight to help our teams understand potential outcomes.",
  },
];

export const boxThreeDeet2: {
  heading: string;
  desc: string;
}[] = [
  {
    heading: "Professionally managed investment portfolios",
    desc: "Time is a precious commodity. Researching investments in ever-changing markets and handling investment transactions are more than most people have time for. Cinpax Trade's Asset Management Solutions program allows you to delegate the daily management of your assets and invest with confidence, knowing that your portfolio is in the hands of experienced professionals.",
  },
  {
    heading: "OUR APPROACH TO ASSET MANAGEMENT",
    desc: "At Cinpax Trade we recognize that each investor is unique. That's why we take a personalized approach to developing an asset management strategy by selecting investment portfolios that closely match your goals, tolerance for risk, and expectation for returns.",
  },
  {
    heading: "To provide you additional value, we strive to:",
    desc: "Create opportunities for rewards while managing risk. Minimize management and administrative costs. Provide ongoing services that adapt to changes in your goals.",
  },
  {
    heading: "Wealth Planning",
    desc: "A solid Wealth Plan ensures you have a financial strategy that supports your aspirations. Once we understand your lifestyle goals, we look at the current path of your finances to ensure that you are on track to meet them through retirement and beyond",
  },
];

export const boxThreeDeet3: {
  heading: string;
  desc: string;
}[] = [
  {
    heading: "A reliable trading platform is the foundation of success",
    desc: "Every trader wants to profit in the best conditions and doesn't want to fear for the safety of personal funds. The first obvious thing a novice trader does is to study different online trading sites.<br/><br/>The main criteria for a successful internet trading platform are international reputation, unwavering reliability, constant support at all stages, and unique useful trading features. These qualities are combined in the award-winning Noble broker and electronic trading platform.",
  },
  {
    heading:
      "Time to take action with the international Noble Trade trading broker",
    desc: "Trading will bring you profit with proper support, constant education, and a reasonable approach. Noble is a broker platform that has created all the conditions to help you improve your trading life in every possible way.",
  },
];

export const tabs: string[] = ["Standard", "Advanced", "NFP", "CHAMBERS"];

export const plans: {
  [name: string]: { name: string; desc: string; offers: string[] }[];
} = {
  Standard: [
    {
      name: "CORPORATE PLAN",
      desc: "40% - 45% PIPS",
      offers: [
        "minimum: $50,000",
        "maximum: UNLIMITED",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "ULTIMATE PLAN",
      desc: "35% - 40% PIPS",
      offers: [
        "minimum: $20,000",
        "maximum: $49,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "PREMIUM PLAN",
      desc: "30% - 35% PIPS",
      offers: [
        "minimum: $10,000",
        "maximum: $19,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "MASTER PLAN",
      desc: "25% - 30% PIPS",
      offers: [
        "minimum: $5,000",
        "maximum: $9,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "STANDARD PLAN",
      desc: "20% - 25% PIPS",
      offers: [
        "minimum: $3,000",
        "maximum: $4,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
  ],
  Advanced: [
    {
      name: "CORPORATE PLAN",
      desc: "70% - 80% PIPS",
      offers: [
        "minimum: $100,000",
        "maximum: UNLIMITED",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "ULTIMATE PLAN",
      desc: "60% - 70% PIPS",
      offers: [
        "minimum: $50,000",
        "maximum: $99,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "PREMIUM PLAN",
      desc: "50% - 60% PIPS",
      offers: [
        "minimum: $20,000",
        "maximum: $49,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "MASTER PLAN",
      desc: "40% - 45% PIPS",
      offers: [
        "minimum: $10,000",
        "maximum: $19,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "STANDARD PLAN",
      desc: "30% - 40% PIPS",
      offers: [
        "minimum: $1,000",
        "maximum: $9,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
  ],
  NFP: [
    {
      name: "ULTIMATE PLAN",
      desc: "200% PIPS",
      offers: [
        "minimum: $150,000",
        "maximum: UNLIMITED",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "STARTER PLAN",
      desc: "100% - 124% PIPS",
      offers: [
        "minimum: $50,000",
        "maximum: $99,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
    {
      name: "PREMIUM PLAN",
      desc: "150% PIPS",
      offers: [
        "minimum: $10,000",
        "maximum: $149,999",
        "10% Trade Commission",
        "24/7 active support",
      ],
    },
  ],
  CHAMBERS: [
    {
      name: "PRO CHAMBERS",
      desc: "90% - 95% PIPS",
      offers: ["30+ BTC", "10% Trade Commission", "24/7 active support"],
    },
    {
      name: "STANDARD CHAMBERS",
      desc: "70% - 75% PIPS",
      offers: ["5 - 14.9 BTC", "10% Trade Commission", "24/7 active support"],
    },
    {
      name: "PREMIUM CHAMBERS",
      desc: "80% - 85% PIPS",
      offers: ["15 - 29.9 BTC", "10% Trade Commission", "24/7 active support"],
    },
    {
      name: "BASIC CHAMBERS",
      desc: "65% - 70% PIPS",
      offers: ["1 - 1.5 BTC", "10% Trade Commission", "24/7 active support"],
    },
  ],
};
