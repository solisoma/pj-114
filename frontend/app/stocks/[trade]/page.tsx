import Future from "@/components/stocks/Future";
import Oil_Gas from "@/components/stocks/Oil_Gas";
import Options from "@/components/stocks/Options";
import Swing from "@/components/stocks/Swing";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;

  switch (trade) {
    case "swings":
      return <Swing />;
    case "futures":
      return <Future />;
    case "options":
      return <Options />;
    case "oilandgas":
      return <Oil_Gas />;
    default:
      redirect("/404");
  }
}
