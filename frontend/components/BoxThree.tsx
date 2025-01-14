import React from "react";

export default function BoxThree({
  bg,
  txtColor,
  heading,
  desc,
  bgImg,
}: {
  bg?: string;
  heading: string;
  desc: string;
  bgImg?: string;
  txtColor?: string;
}) {
  console.log(bg);
  return (
    <div className="relative min-h-[35vh] h-full rounded-lg overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${
          bgImg || "bg-gradient-to-br from-[#202228] to-[#131418]"
        }`}
      ></div>

      {/* Semi-Transparent Overlay */}
      <div
        className={`absolute inset-0 ${
          bg || "bg-gradient-to-br from-[#202228] to-[#131418]"
        } ${bg && "opacity-80"}`}
      ></div>

      {/* Content */}
      <div className="relative p-8 flex flex-col gap-4">
        <h2 className={`${txtColor || "text-white"} font-semibold text-xl`}>
          {heading}
        </h2>
        <p
          className={`${txtColor || "text-white"}`}
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </div>
    </div>
  );
}
