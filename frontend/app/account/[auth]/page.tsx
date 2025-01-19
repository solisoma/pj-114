import SignIn from "@/components/sign-in/SignIn";
import SignUp from "@/components/sign-up/SignUp";
import { redirect } from "next/navigation";
import React from "react";

export default async function Auth({
  params,
}: {
  params: Promise<{ auth: string }>;
}) {
  const { auth } = await params;

  switch (auth) {
    case "sign-in":
    case "sign-up":
      return (
        <div className="min-h-screen bg-[#F6F9FF] md:flex md:justify-between md:bg-white">
          {auth == "sign-up" && (
            <div className="flex md:flex-1 hidden items-center bg-[#F2F2F2] justify-center md:flex">
              <img src="/sign-up.png" className="w-[70%]" />
            </div>
          )}
          <div className="h-[inherit] md:flex-1 md:flex">
            <div className="md:w-full">
              {auth == "sign-in" ? (
                <div className="flex items-center h-screen">
                  <div className="w-full">
                    <SignIn />
                  </div>
                </div>
              ) : (
                <div className="flex items-center h-screen">
                  <div className="w-full">
                    <SignUp />
                  </div>
                </div>
              )}
            </div>
          </div>
          {auth == "sign-in" && (
            <div className="flex md:flex-1 hidden items-center bg-[#F2F2F2] justify-center md:flex">
              <img src="/sign-in.png" className="w-[70%]" />
            </div>
          )}
        </div>
      );
    default:
      redirect("/404");
  }
}
