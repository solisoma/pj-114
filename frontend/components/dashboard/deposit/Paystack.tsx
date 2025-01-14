// import { get_user_status } from "@/api/default";
// import { verify_trx } from "@/api/payment";
// import { MultiType } from "@/api/type";
// import Script from "next/script";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export default function Paystack({
//   refresh,
// }: {
//   refresh?: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const [amount, setAmount] = useState<number>();
//   const [email, setEmail] = useState<MultiType>();
//   const [verifying, setVerifying] = useState<boolean>(false);

//   const verifyTransaction = async (res: any) => {
//     setVerifying(true);
//     const verify = await verify_trx({
//       amount: amount!,
//       ref: String(res.reference),
//     });

//     if (verify) {
//       toast.success("Payment Successful! Reference: " + res.reference);
//       setVerifying(false);
//       setAmount(undefined);
//       refresh!((prev) => !prev);
//       return;
//     }
//     toast.info("Payment Failed ");
//     setVerifying(false);
//   };

//   const handlePayment = () => {
//     const paystack = (window as any).PaystackPop;

//     if (!amount) {
//       toast.info("Please enter an amount.");
//       return;
//     }

//     const handler = paystack.setup({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY,
//       email,
//       amount: (amount! + Number(process.env.NEXT_PUBLIC_PAYSTACK_CHARGE)) * 100,
//       currency: "NGN",
//       callback: verifyTransaction,
//       onClose: function () {
//         toast.info(
//           "Transaction was not completed, you can cancel the payment."
//         );
//       },
//     });

//     handler.openIframe();
//   };

//   async function setUser() {
//     const get_user = await get_user_status();
//     setEmail(get_user.email);
//   }

//   useEffect(() => {
//     setUser();
//   }, []);

//   return (
//     <div>
//       <Script src="https://js.paystack.co/v2/inline.js" />
//       {!verifying ? (
//         <div className="flex flex-col justify-center">
//           <div className="mb-6">
//             <h2 className="text-3xl font-bold text-[#D3D3D3] mb-2">
//               Paystack Payment
//             </h2>
//             <p className="text-sm text-white">
//               A charge of ₦50 will be applied to each deposit
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-2 md:flex-row md:gap-2">
//             <input
//               type="number"
//               placeholder="Enter amount"
//               className="outline-none p-1 border border-gray-400 rounded-lg w-full bg-background2 text-white"
//               onChange={(e) => setAmount(Number(e.target.value))}
//             />
//             <button
//               onClick={handlePayment}
//               className="p-2 bg-btn rounded-lg text-white w-full md:w-[8rem]"
//             >
//               Pay Now
//             </button>
//           </div>
//         </div>
//       ) : (
//         <span className="loader"></span>
//       )}
//     </div>
//   );
// }
