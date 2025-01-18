import { uploadKyc } from "@/api/app";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LogOutActionType } from "./type";

export default function Kyc({
  closeModal,
  setUser,
}: LogOutActionType & {
  setUser?: () => void;
}) {
  const [idDocumentBack, setIdDocumentFront] = useState<File | null>(null);
  const [idDocumentFront, setIdDocumentBack] = useState<File | null>(null);

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
    if (!idDocumentFront || !idDocumentBack) {
      toast.error("Please upload all required documents.");
      return;
    }
    // Handle the submission logic here
    console.log("Submitting KYC documents:", {
      idDocumentBack,
      idDocumentFront,
    });

    const send = await uploadKyc({
      front: idDocumentFront,
      back: idDocumentBack,
    });

    if (send) {
      toast.success("Document uploaded successfully");
      setUser!();
      closeModal!();
      return;
    }
    toast.error("Uploading of document failed");
    return;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#ffffff] mb-4">
        KYC Verification
      </h2>
      <p className="text-[#A0AEC0] mb-6">
        Please upload the required documents to verify your identity and
        address. Ensure the documents are clear and valid.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="idDocument"
            className="block text-text-[#A0AEC0] font-medium mb-2"
          >
            Government-issued ID (License) Front
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
            Government-issued ID (License) Back
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
  );
}
