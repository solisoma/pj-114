import { get_owner_wallet, sendProof } from "@/api/transactions";
import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { setScript } from "../overview/Overview";

export default function ConfirmDeposit() {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [qrcode, setQrcode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const search = useSearchParams();
  const containerRef = useRef(null);

  async function handleSubmitProof() {
    if (!paymentProof) {
      toast.error("Please upload a payment proof.");
      return;
    }
    try {
      // Logic to handle proof submission
      await sendProof(id || -1, paymentProof);
      toast.success("Payment proof submitted successfully.");
      setTimeout(() => {
        window.location.href = "/dashboard?page=overview";
      }, 800);
    } catch (e) {
      toast.error("Failed to submit payment proof. Please try again.");
    }
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied to clipboard!");
  }

  async function handleParams() {
    const name = search.get("name");
    const id = search.get("id");
    const amount = search.get("amount");

    if (!id || !name || !amount) {
      toast.error("Incorrect URL");
      window.location.href = "/dashboard?page=overview";
      return;
    }

    setId(Number(id));
    setName(name);
    setAmount(Number(amount));

    // Get wallet address
    const wallet = await get_owner_wallet(name);
    if (!wallet) {
      toast.info("Sorry an error occurred try depositing again.");
      setTimeout(() => {
        window.location.href = "/dashboard?page=overview";
      }, 1000);
    } else {
      setWalletAddress(wallet.address);
      setQrcode(wallet.qrcode);
    }
  }

  useEffect(() => {
    handleParams();

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
          <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-[#FEF6E7] mb-4">
            <p className="font-bold text-sm bg-[#FFAE1F] rounded-lg py-2 px-3">
              Your Payment Method
            </p>
            <p className="text-[#FFAE1F]">{name}</p>
          </div>
          <p className="text-[#A0AEC0] font-bold text-xl text-center mb-4">
            You are about to make a deposit of{" "}
            <span className="text-[#FFAE1F]">{`${amount} ${name}`}</span> using
            your selected payment method
          </p>
          <div className="flex w-full justify-center mb-4">
            <div className="bg-white w-[50%] h-[30vh] p-2 rounded-lg md:w-[40%]">
              <img
                src={`${process.env.NEXT_PUBLIC_SAPI_URL}/static/${qrcode}`} // Replace with your QR code generation logic
                alt="QR Code"
                className="mb-2 w-full h-full"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p>{name} Address</p>
            <div className="flex items-center justify-between border p-1 rounded-lg w-full gap-2">
              <p className="text-sm text-gray-300 font-mono break-words">
                Wallet Address: {walletAddress}
              </p>
              <Button
                onClick={handleCopyAddress}
                text="Copy"
                type="background"
                url="#"
                style="from-background2 to-background2 py-1 px-3 md:py-2 md:px-4"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p>Upload Payment proof after payment</p>
            <input
              type="file"
              onChange={({ target }) => {
                if (target) {
                  setPaymentProof(target.files![0]);
                } else {
                  setPaymentProof(null);
                }
              }}
              className="w-full border rounded-lg p-1"
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleSubmitProof}
              text="Submit Payment"
              type="background"
              url="#"
              style="from-background2 to-background2 py-2 px-4 md:py-3 md:px-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
