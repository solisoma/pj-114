import React, { useState } from "react";
import Profile from "./Profile";
import { FaRegUserCircle } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";
import Account from "./Account";

export default function Overview() {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex bg-[#EBF3FE] rounded-lg px-8 h-[25vh] items-end overflow-hidden md:items-center">
        <div>
          <p className="relative font-bold text-3xl text-black z-[10]">
            Profile
          </p>
        </div>
        <div className="absolute h-[15rem] right-0 -bottom-2">
          <img src="/user.jpg" />
        </div>
      </div>
      <div className="flex gap-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex gap-2 py-2 px-4 ${
            activeTab === "profile" && "border-b border-background2"
          }`}
        >
          <FaRegUserCircle size={24} />
          <h2>Profile</h2>
        </button>
        <button
          onClick={() => setActiveTab("account")}
          className={`flex gap-2 py-2 px-4 ${
            activeTab === "account" && "border-b border-background2"
          }`}
        >
          <TbBuildingBank size={24} />
          <h2>Account</h2>
        </button>
      </div>
      {activeTab === "profile" ? <Profile /> : <Account />}
    </div>
  );
}
