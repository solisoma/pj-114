import { NavType } from "./type";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrAppsRounded } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { TbReportMoney } from "react-icons/tb";
import { TbBuildingBank } from "react-icons/tb";
import { GrDocumentUpload } from "react-icons/gr";
import { GrDocumentDownload } from "react-icons/gr";
import Overview from "@/components/dashboard/overview/Overview";
import POverview from "@/components/dashboard/setting/Overview";
import Investment from "@/components/dashboard/app/Investment";
import Plan from "@/components/dashboard/app/Copy";
import Invest from "@/components/dashboard/app/Invest";
import CopyTrade from "@/components/dashboard/app/CopyTrade";
import Transactions from "@/components/dashboard/transaction/Transactions";
import Withdrawals from "@/components/dashboard/transaction/Withdrawals";
import Deposits from "@/components/dashboard/transaction/Deposits";
import Referral from "@/components/dashboard/transaction/Referral";
import React from "react";
import Admin from "@/components/dashboard/admin/Admin";
import Kyc from "@/components/dashboard/kyc/Kyc";
import ConfirmDeposit from "@/components/dashboard/deposit/ConfirmDeposit";
import Wallets from "@/components/dashboard/admin/Wallets";

interface IRoute {
  [key: string]: React.FC<any>;
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
  copytrade: CopyTrade,
  transaction: Transactions,
  withdrawal: Withdrawals,
  deposit: Deposits,
  referral: Referral,
  admin: Admin,
  kyc: Kyc,
  fundwallet: ConfirmDeposit,
  wallets: Wallets,
};
