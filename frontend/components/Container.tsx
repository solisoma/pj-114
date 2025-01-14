import React from "react";

export default function Container({
  heading,
  btn,
  desc,
  btnName,
  bg,
  imgSrc,
  txtColor,
}: {
  heading: string;
  btn?: boolean;
  desc: string;
  bg?: string;
  btnName?: string;
  imgSrc?: string;
  txtColor?: string;
}) {
  return (
    <div
      className={`flex gap-4 py-[3rem] ${bg || "bg-[#14151A]"} ${
        txtColor || "text-white"
      } rounded-lg min-h-[50vh]`}
    >
      <div className="flex flex-col w-full justify-center gap-4 pl-[2rem] md:w-[65%]">
        <h2 className="font-bold text-[1.3rem]">{heading}</h2>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
        {btn && (
          <div className="flex">
            <button className="bg-[#0094FF] text-white rounded-lg p-[1rem]">
              {btnName}
            </button>
          </div>
        )}
      </div>
      <div className="hidden items-center pr-[2rem] w-[35%] md:flex">
        <div className="rounded-lg">
          <img
            className="rounded-lg"
            src={
              imgSrc ||
              `https://static.vecteezy.com/system/resources/previews/000/517/088/original/vector-landscape-illustration.png`
            }
          />
        </div>
      </div>
    </div>
  );
}
