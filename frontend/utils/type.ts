import { IconType } from "react-icons/lib";

export interface NavType {
  header: string;
  content: {
    icon: IconType;
    text: string;
    route?: string;
    sub?: { text: string; route: string }[];
  }[];
}

export interface IconStoreType {
  facebook: { icon: IconType; color: string };
  facebook_dating: { icon: IconType; color: string };
  usa_texting: { icon: IconType; color: string };
  tiktok: { icon: IconType; color: string };
  instagram: { icon: IconType; color: string };
  discord: { icon: IconType; color: string };
  reddit: { icon: IconType; color: string };
  linkedin: { icon: IconType; color: string };
  tutorials: { icon: IconType; color: string };
  mail: { icon: IconType; color: string };
  twitter: { icon: IconType; color: string };
  premium_vpn: { icon: IconType; color: string };
  telegram_premium: { icon: IconType; color: string };
  apple_icloud: { icon: IconType; color: string };
  vip_numbers: { icon: IconType; color: string };
  miscellaneous: { icon: IconType; color: string };
}
