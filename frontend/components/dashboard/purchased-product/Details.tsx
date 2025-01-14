import React from "react";
import { getIcon } from "../productDetails/ProductDetails";
import { FaRegCopy } from "react-icons/fa6";
import { productDetails, subProductDetails } from "../productDetails/type";
import { toast } from "react-toastify";

export default function Details({
  show,
  details,
}: {
  show: boolean;
  details: productDetails & subProductDetails;
}) {
  async function addToClipBoard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Details copied to clipboard!");
    } catch {
      toast.error("Text failed to copy");
    }
  }
  return (
    <section className="flex flex-col gap-4 bg-background2 shadow-sm md:shadow-lg p-2 rounded-lg border border-gray-800 min-h-[30vh]">
      <div className="flex gap-4 items-center justify-start">
        {getIcon(details.product!.category)}
      </div>
      <div>
        <h1 className="text-xl text-[#D3D3D3] font-bold"> {details.name}</h1>
      </div>
      <div className="flex flex-col justify-start gap-4 text-lg">
        <div className="flex gap-3 items-center">
          <strong>Visit:</strong>
          <a
            href={details.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[60%] overflow-hidden whitespace-nowrap text-ellipsis text-sm underline"
          >
            {details.preview || "No preview"}
          </a>
        </div>
        {show && (
          <div className="flex justify-between items-center w-full">
            <p className="w-[60%] overflow-hidden whitespace-nowrap text-ellipsis">
              <strong>Details:</strong> {details.details}
            </p>
            <button>
              <FaRegCopy onClick={() => addToClipBoard(details.details)} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
