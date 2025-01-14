// "use client";
// import { FaRegCopy } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function Manual() {
//   async function addToClipBoard(text: string, name: string) {
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success(`${name} copied to clipboard!`);
//     } catch {
//       toast.error(`${name} failed to copy`);
//     }
//   }
//   return (
//     <div className="">
//       <div className="bg-background2 shadow-md rounded-lg p-8 max-w-md text-center">
//         <h1 className="text-3xl font-bold text-[#D3D3D3] mb-6">
//           Payment Instructions
//         </h1>
//         <p className="text-white mb-4">
//           Please follow the steps below to complete your payment:
//         </p>
//         <ol className="list-decimal list-inside text-left mb-6 text-[#D3D3D3]">
//           <li>Send your chosen amount to the account number provided.</li>
//           <li>
//             Send your Thesmsplug account name along with your transaction
//             receipt.
//           </li>
//         </ol>
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold text-[#D3D3D3]">
//             Account Details
//           </h2>
//           <div className="flex flex-col items-center text-white">
//             <div className="flex gap-3 items-center">
//               <p>
//                 <span className="font-bold">Bank Name:</span> Moniepoint
//               </p>
//               <button>
//                 <FaRegCopy
//                   onClick={() => addToClipBoard("Moniepoint", "Bank Name")}
//                 />
//               </button>
//             </div>
//             <div className="flex gap-3 items-center">
//               <p>
//                 <span className="font-bold">Account Name:</span> MY VTU HUB
//               </p>
//               <button>
//                 <FaRegCopy
//                   onClick={() => addToClipBoard("MY VTU HUB", "Account Name")}
//                 />
//               </button>
//             </div>
//             <div className="flex gap-3 items-center">
//               <p>
//                 <span className="font-bold">Account Number:</span> 8254576181
//               </p>
//               <button>
//                 <FaRegCopy
//                   onClick={() => addToClipBoard("8254576181", "Account Number")}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//         <p className="text-tex2 mb-4">
//           Once done, click the button below to send your payment proof.
//         </p>
//         <a
//           href="https://wa.me/+2347066196550"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
//         >
//           Send Proof
//         </a>
//       </div>
//     </div>
//   );
// }
