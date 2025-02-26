import React from "react";

export default function InfoBox({
  header,
  desc,
}: {
  header: string;
  desc: string | React.JSX.Element;
}) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg shadow-md shadow-gray-200 transition-transform duration-500 cursor-pointer bg-[--background] md:hover:translate-y-[-8px]">
      <div>
        <h2 className="text-xl font-semibold">{header}</h2>
        <div className="flex gap-6 font-base">
          {React.isValidElement(desc) ? desc : <p>{desc}</p>}
        </div>
      </div>
    </div>
  );
}
