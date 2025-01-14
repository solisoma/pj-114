// import React from "react";
// import { AiOutlineNotification } from "react-icons/ai";
// import { CiEdit } from "react-icons/ci";
// import { announcementDetails } from "./type";
// import { MdDelete } from "react-icons/md";

// export default function Details({
//   notUser,
//   details,
//   showDelete,
//   setEditAnnouncementModal,
// }: {
//   notUser: boolean;
//   details: announcementDetails;
//   setEditAnnouncementModal: (param: announcementDetails) => void;
//   showDelete: (product: announcementDetails) => void;
// }) {
//   function urlify(text: string) {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     return text.replace(
//       urlRegex,
//       (url) =>
//         `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>`
//     );
//   }

//   return (
//     <section className="flex flex-col justify-between gap-4 bg-background2 shadow-sm md:shadow-lg p-2 rounded-lg border border-gray-800 min-h-[20vh]">
//       <div className="flex gap-4 items-center justify-start">
//         <AiOutlineNotification size={60} fill="#FFA500" />
//       </div>
//       <div className="flex flex-col gap-2">
//         <h1 className="text-2xl text-[#D3D3D3] font-bold"> {details.title}</h1>
//         <p
//           className="text-white text-lg break-words"
//           dangerouslySetInnerHTML={{
//             __html: urlify(details.content),
//           }}
//         />
//       </div>
//       <div className="flex items-center justify-end">
//         {notUser && (
//           <div className="flex gap-4">
//             <CiEdit
//               className="cursor-pointer"
//               size={30}
//               onClick={() => setEditAnnouncementModal(details)}
//             />
//             <MdDelete
//               className="cursor-pointer"
//               size={30}
//               onClick={() => {
//                 showDelete(details);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
