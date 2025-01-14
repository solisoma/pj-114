import Advanced from "@/components/mirror/Advanced";
import LiveTrading from "@/components/mirror/LiveTrading";
import Copy from "@/components/mirror/Copy";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;

  switch (trade) {
    case "copy":
      return <Copy />;
    case "advance":
      return <Advanced />;
    case "live-trading":
      return <LiveTrading />;
    default:
      redirect("/404");
  }
}
