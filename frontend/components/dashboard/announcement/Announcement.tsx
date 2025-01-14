// import React, { useEffect, useState } from "react";
// import { PageWrapper } from "../PageWrapper";
// import { HeaderWrapper } from "../number/HeaderWrapper";
// import Modal from "../Pop";
// import Pop from "../Modal";
// import EditproductForm from "./EditAnnouncementForm";
// import { announcementDetails } from "./type";
// import Details from "./Details";
// import { toast } from "react-toastify";
// import { FormikHelpers } from "formik";
// import { ImFilesEmpty } from "react-icons/im";
// import {
//   add_announcement,
//   delete_announcement,
//   edit_announcement,
//   get_announcement,
// } from "@/api/announcement";
// import AddAnnouncementForm from "./AddAnnouncementForm";
// import { IoMdAdd } from "react-icons/io";
// import { DeleteAnnouncement } from "../Utils";

// export default function Announcement({ permission }: { permission?: string }) {
//   const [details, setDetails] = useState<announcementDetails[]>();
//   const [singleDetail, setSingleDetail] = useState<announcementDetails>();
//   const [editAnnouncementModal, setEditAnnouncementModal] =
//     useState<boolean>(false);
//   const [addAnnouncementModal, setAddAnnouncementModal] =
//     useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [modalDetails, setModalDetails] = useState<{
//     show: boolean;
//     type: string;
//   }>({
//     show: false,
//     type: "delete",
//   });

//   function editAnnouncement(detail: announcementDetails) {
//     setSingleDetail(detail);
//     setEditAnnouncementModal(true);
//   }

//   async function getAnnouncement() {
//     setLoading(true);
//     const announcements = await get_announcement();
//     setDetails(announcements);
//     setLoading(false);
//   }

//   async function onDelete() {
//     const delete_prod = await delete_announcement(singleDetail?.id!);
//     if (!delete_prod) throw new Error();
//     setModalDetails((prev) => {
//       return { ...prev, show: false };
//     });
//     getAnnouncement();
//   }

//   function showDelete(detail: announcementDetails) {
//     setSingleDetail(detail);
//     setModalDetails({ show: true, type: "delete" });
//   }

//   async function handleSubmit(
//     value: announcementDetails,
//     actions: FormikHelpers<any>,
//     type: string
//   ) {
//     switch (type) {
//       case "add-announcement":
//         const addNew = await add_announcement(value);
//         if (addNew) {
//           toast.success("Announcement added successfully");
//           setAddAnnouncementModal(false);
//           getAnnouncement();
//           actions.resetForm();
//           return;
//         }
//         toast.error("Adding of announcement failed");
//         break;
//       case "edit-announcement":
//         console.log(value);
//         const edit = await edit_announcement({
//           ...value,
//           id: singleDetail?.id,
//         });
//         if (edit) {
//           toast.success("Announcement updated successfully");
//           setEditAnnouncementModal(false);
//           getAnnouncement();
//           actions.resetForm();
//           return;
//         }
//         toast.error("Announcement update failed");
//         actions.setSubmitting(false);
//         break;
//     }
//   }

//   useEffect(() => {
//     getAnnouncement();
//     const lstorage = JSON.parse(localStorage.getItem("notis") || "{}");
//     if (lstorage.exist)
//       localStorage.setItem(
//         "notis",
//         JSON.stringify({ ...lstorage, exist: false })
//       );
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="flex items-center justify-between h-[9%] md:px-4 w-full">
//         <HeaderWrapper header="Notification" />
//         {permission !== "user" && (
//           <button type="button" onClick={() => setAddAnnouncementModal(true)}>
//             <IoMdAdd className="text-tex" size={24} />
//           </button>
//         )}
//       </div>
//       <div className="remove-scrollbar h-[87%] overflow-y-auto text-white md:h-[90%]">
//         {details && details![0] ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
//             {details?.map((detail) => (
//               <Details
//                 notUser={permission !== "user"}
//                 details={detail}
//                 setEditAnnouncementModal={editAnnouncement}
//                 showDelete={showDelete}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center gap-2 text-center font-semibold text-tex h-[80%] w-full">
//             {loading ? (
//               <span className="loader"></span>
//             ) : (
//               <>
//                 <p>There are no notifications at this time.</p>
//                 <ImFilesEmpty className="dropdown-tex" size={40} />
//               </>
//             )}
//           </div>
//         )}
//       </div>
//       <Modal
//         styleString="bg-background2"
//         visible={editAnnouncementModal}
//         setVisible={setEditAnnouncementModal}
//       >
//         <div className="flex flex-col gap-6 h-[87%] overflow-y-auto px-2">
//           <EditproductForm
//             singleDetail={singleDetail!}
//             onSubmit={handleSubmit}
//           />
//         </div>
//       </Modal>
//       <Modal
//         styleString="bg-background2"
//         visible={addAnnouncementModal}
//         setVisible={setAddAnnouncementModal}
//       >
//         <div className="flex flex-col gap-6 h-[87%] overflow-y-auto px-2">
//           <AddAnnouncementForm onSubmit={handleSubmit} />
//         </div>
//       </Modal>
//       <Pop
//         show={modalDetails.show}
//         setShow={(show) => {
//           setModalDetails((prev) => {
//             return { ...prev, show };
//           });
//         }}
//         classes="bg-background2 w-[80%] h-[40%] shadow-2xl md:p-[.1vw] rounded-lg md:w-[30%]"
//       >
//         <DeleteAnnouncement onDelete={onDelete} />
//       </Pop>
//     </PageWrapper>
//   );
// }
