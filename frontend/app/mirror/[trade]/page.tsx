import Advanced from "@/components/mirror/Advanced";
import LiveTrading from "@/components/mirror/LiveTrading";
import Options from "@/components/mirror/Options";
import { redirect } from "next/navigation";
import React from "react";

export default function page({
  params: { trade },
}: {
  params: { trade: string };
}) {
  switch (trade) {
    case "options":
      return <Options />;
    case "advance":
      return <Advanced />;
    case "live-trading":
      return <LiveTrading />;
    default:
      redirect("/404");
  }
}
