"use client";

import React, { useEffect, useRef } from "react";

export default function BoxTwo({
  imgSrc,
  desc,
  url,
}: {
  url?: string;
  imgSrc?: string;
  desc?: string;
}) {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    const parentElement = parentRef.current;
    const childElement = childRef.current;

    if (parentElement && childElement) {
      const handleMouseEnter = () => {
        (childElement as any).classList.remove("bg-[#14151A]");
        (childElement as any).classList.add("bg-[#0094FF]");
      };

      const handleMouseLeave = () => {
        (childElement as any).classList.remove("bg-[#0094FF]");
        (childElement as any).classList.add("bg-[#14151A]");
      };

      (parentElement as any).addEventListener("mouseenter", handleMouseEnter);
      (parentElement as any).addEventListener("mouseleave", handleMouseLeave);

      // Cleanup event listeners on component unmount
      return () => {
        (parentElement as any).removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        (parentElement as any).removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      };
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className="flex flex-col rounded-lg min-h-[35vh] h-full"
    >
      <div className="h-[70%]">
        <img
          className="rounded-t-lg h-full w-full"
          src={
            imgSrc ||
            `https://static.vecteezy.com/system/resources/previews/000/517/088/original/vector-landscape-illustration.png`
          }
        />
      </div>
      <a
        href={url || "#"}
        ref={childRef}
        className="min-h-[30%] h-full p-[.9rem] bg-[#14151A] rounded-b-lg"
      >
        <p
          dangerouslySetInnerHTML={{
            __html:
              desc ||
              `Swing Trading<br/>Swing Trading is a medium-term trading strategy aimed at capturing short- to medium-term price movements in financial markets, typically over a period of a few days to several weeks. Traders use technical and fundamental analysis to identify opportunities.`,
          }}
        />
      </a>
    </div>
  );
}
