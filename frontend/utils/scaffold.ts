import { NavType } from "./type";
// import Product from "@/components/dashboard/number/Number";
// import Details from "@/components/dashboard/productDetails/ProductDetails";
// import Admin from "@/components/dashboard/admin/Admin";
// import Deposit from "@/components/dashboard/deposit/Deposit";
// import Profile from "@/components/dashboard/setting/Profile";
// import PurchasedProduct from "@/components/dashboard/purchased-product/PurchasedProduct";
// import VIPNumbers from "@/components/dashboard/vip-numbers/VIPNumbers";
// import Suspended from "@/components/dashboard/Suspended";
import { MdAdminPanelSettings } from "react-icons/md";
// import Announcement from "@/components/dashboard/announcement/Announcement";
import { GrAppsRounded } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { TbReportMoney } from "react-icons/tb";
import { TbBuildingBank } from "react-icons/tb";
import { GrDocumentUpload } from "react-icons/gr";
import { GrDocumentDownload } from "react-icons/gr";
import { ImSwitch } from "react-icons/im";
import Overview from "@/components/dashboard/overview/Overview";
import POverview from "@/components/dashboard/setting/Overview";
import Investment from "@/components/dashboard/app/Investment";
import Plan from "@/components/dashboard/app/Plan";
import Invest from "@/components/dashboard/app/Invest";

interface IRoute {
  [key: string]: React.FC;
}

export function sidenavs(notUser: boolean): NavType[] {
  const staticNavs: NavType[] = [
    {
      header: "HOME",
      content: [
        { icon: GrAppsRounded, text: "Overview", route: "overview" },
        { icon: RiUserSettingsLine, text: "My Profile", route: "profile" },
      ],
    },
    {
      header: "APPS",
      content: [
        {
          icon: FiShare2,
          text: "All Investments",
          sub: [
            { text: "Plan Investments", route: "iplan" },
            { text: "CopyTrade Investments", route: "icopytrade" },
          ],
        },
        { icon: TbReportMoney, text: "Our Plans", route: "plan" },
        { icon: GrAppsRounded, text: "Copy Trading", route: "copytrade" },
      ],
    },
    {
      header: "TRANSACTIONS",
      content: [
        { icon: TbBuildingBank, text: "Transactons", route: "transaction" },
        { icon: GrDocumentUpload, text: "Withdrawals", route: "withdrawal" },
        { icon: GrDocumentDownload, text: "Deposits", route: "deposit" },
        { icon: FiShare2, text: "Referrals", route: "referral" },
      ],
    },
    {
      header: "EXTRAS",
      content: [{ icon: ImSwitch, text: "Log Out", route: "#" }],
    },
  ];

  if (notUser) {
    staticNavs.push({
      header: "Admin",
      content: [
        { icon: MdAdminPanelSettings, text: "Admin panel", route: "admin" },
      ],
    });
  }

  return staticNavs;
}

export const RouteHash: IRoute = {
  overview: Overview,
  profile: POverview,
  iplan: Investment,
  icopytrade: Plan,
  plan: Invest,
  //   product: Details,
  //   admin: Admin,
  //   deposit: Deposit,
  //   notification: Announcement,
  //   setting: Profile,
  //   purchased: PurchasedProduct,
  //   vip: VIPNumbers,
  //   suspended: Suspended,
};
