// import React from "react";
// import { getIcon } from "./ProductDetails";
// import { CiEdit } from "react-icons/ci";
// import { MdAddCircleOutline } from "react-icons/md";
// import { productDetails } from "./type";

// export default function Details({
//   notUser,
//   details,
//   setShowDetails,
//   setEditProductModal,
//   setaddProductModal,
// }: {
//   notUser: boolean;
//   details: productDetails;
//   setShowDetails: (param: productDetails) => void;
//   setEditProductModal: (param: productDetails) => void;
//   setaddProductModal: (param: productDetails) => void;
// }) {
//   return (
//     <section className="flex flex-col gap-4 bg-background2 shadow-sm md:shadow-lg p-2 rounded-lg border border-gray-800 min-h-[30vh]">
//       <div className="flex gap-4 items-center justify-start">
//         {getIcon(details.category)}
//       </div>
//       <div>
//         <h1 className="text-xl text-[#D3D3D3] font-bold"> {details.name}</h1>
//         <p className="text-white text-lg break-words">{details.desc}</p>
//       </div>
//       <div className="flex flex-col justify-start gap-4 font-bold text-lg">
//         <p className=""> Qty: {details.quantity}</p>
//         <p>Price: {details.price}</p>
//       </div>
//       <div className="flex items-center justify-between gap-4">
//         <button
//           className="bg-btn p-2 rounded-lg text-white w-[5rem]"
//           onClick={() => setShowDetails(details)}
//         >
//           view
//         </button>
//         {notUser && (
//           <div className="flex gap-4">
//             <CiEdit
//               className="cursor-pointer"
//               size={30}
//               onClick={() => setEditProductModal(details)}
//             />
//             <MdAddCircleOutline
//               className="cursor-pointer"
//               size={30}
//               onClick={() => setaddProductModal(details)}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
