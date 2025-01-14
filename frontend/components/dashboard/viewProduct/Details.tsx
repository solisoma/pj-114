import React from "react";
import { getIcon } from "../productDetails/ProductDetails";
import { FaRegCopy } from "react-icons/fa6";
import { productDetails, subProductDetails } from "../productDetails/type";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function Details({
  notUser,
  showDelete,
  showPurchase,
  show,
  details,
}: {
  notUser: boolean;
  show: boolean;
  details: productDetails & subProductDetails;
  showDelete: (product: subProductDetails & productDetails) => void;
  showPurchase: (product: subProductDetails & productDetails) => void;
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
        {getIcon(details.category)}
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
      {!show && (
        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-btn p-2 rounded-lg text-white w-[5rem]"
            onClick={() => {
              showPurchase(details);
            }}
          >
            Purchase
          </button>
          {notUser && (
            <button>
              <MdDelete
                size={30}
                onClick={() => {
                  showDelete(details);
                }}
              />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
