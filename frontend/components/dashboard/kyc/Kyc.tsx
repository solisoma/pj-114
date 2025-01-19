import { uploadKyc } from "@/api/app";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { setScript } from "../overview/Overview";
import { FaIdCard } from "react-icons/fa";

export default function Kyc() {
  const [idDocumentBack, setIdDocumentFront] = useState<File | null>(null);
  const [idDocumentFront, setIdDocumentBack] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("");
  const containerRef = useRef(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType) {
      toast.error("Please select the document type");
      return;
    }

    if (!idDocumentFront || !idDocumentBack) {
      toast.error("Please upload all required documents.");
      return;
    }

    const send = await uploadKyc({
      front: idDocumentFront,
      back: idDocumentBack,
    });

    if (send) {
      toast.success("Document uploaded successfully");
      setTimeout(() => {
        window.location.href = "/dashboard?page=overview";
      }, 800);
      return;
    }
    toast.error("Uploading of document failed");
    return;
  };

  useEffect(() => {
    setScript(
      containerRef,
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
      {
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="tradingview-widget-container">
        <div
          ref={containerRef}
          className="tradingview-widget-container__widget"
        ></div>
      </div>
      <div className="flex w-full md:justify-center">
        <div className="w-full md:w-[60%]">
          <h2 className="p-2 font-bold rounded-lg bg-[#E6FFFA] text-[#13DFBD] mb-4">
            KYC Verification
          </h2>
          <h2 className="text-[#A0AEC0] text-center text-2xl font-bold mb-6">
            Upload a proof of your{" "}
            <span className="text-[#13DFBD]">identity</span>
          </h2>
          <div className="flex w-full justify-center">
            <FaIdCard size={150} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="DocumentType"
                className="block text-text-[#A0AEC0] font-medium mb-2"
              >
                Document Type
              </label>
              <select
                className="w-full border bg-black rounded-md px-3 py-2 text-white"
                onChange={({ target }) => setDocumentType(target.value)}
              >
                <option disabled selected value="">
                  Select Document Type
                </option>
                <option value="driver-license">Driver's License</option>
                <option value="idCard">National Identity Card</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="idDocument"
                className="block text-text-[#A0AEC0] font-medium mb-2"
              >
                Document (Front)
              </label>
              <input
                type="file"
                id="idDocument"
                onChange={(e) => handleFileChange(e, setIdDocumentFront)}
                className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="addressProof"
                className="block text-text-[#A0AEC0] font-medium mb-2"
              >
                Document (Back)
              </label>
              <input
                type="file"
                id="addressProof"
                onChange={(e) => handleFileChange(e, setIdDocumentBack)}
                className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Submit Documents
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
