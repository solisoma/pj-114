import React from "react";

export default function PlanBox({
  name,
  desc,
  offers,
}: {
  name: string;
  desc: string;
  offers: string[];
}) {
  return (
    <div className="flex flex-col justify-between border-[#2677BD] w-full border rounded-lg min-h-[50vh] h-full py-[3rem] hover:md:scale-105 transition-transform duration-500">
      <div className="flex flex-col gap-8">
        <h2 className="text-white w-full text-center font-bold text-2xl">
          {name}
        </h2>
        <h2 className="text-center w-full p-4 bg-[#2677BD] font-bold text-2xl">
          {desc}
        </h2>
        <div className="w-full flex justify-center">
          <button className="rounded-full bg-black py-2 px-8 hover:bg-purple-800">
            Get Started
          </button>
        </div>
      </div>
      <div className="gap-2 px-[15%]">
        {offers.map((offers, i) => (
          <p key={i} className="font-semibold text-sm">
            {offers}
          </p>
        ))}
      </div>
    </div>
  );
}
