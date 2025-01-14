// import React, { useEffect, useState } from "react";
// import { PageWrapper } from "../PageWrapper";
// import { HeaderWrapper } from "../number/HeaderWrapper";
// import { productDetails, subProductDetails } from "../productDetails/type";
// import { get_sub_product_by_category, purchase_product } from "@/api/product";
// import { ImFilesEmpty } from "react-icons/im";
// import { Categories } from "@/api/type";
// import Details from "./Details";
// import Modal from "../Modal";
// import { PurchaseProduct } from "../Utils";

// export default function VIPNumbers({
//   refresh,
// }: {
//   refresh?: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const [products, setProducts] =
//     useState<(subProductDetails & productDetails)[]>();
//   const [singleProducts, setSingleProducts] = useState<
//     subProductDetails & productDetails
//   >();
//   const [modalDetails, setModalDetails] = useState<{
//     show: boolean;
//     type: string;
//   }>({
//     show: false,
//     type: "delete",
//   });
//   const [loading, setLoading] = useState<boolean>(true);

//   async function getProducts() {
//     const products = await get_sub_product_by_category(Categories.VIPNumbers);
//     setProducts(products);
//     setLoading(false);
//   }

//   async function onPurchase() {
//     const purchase_prod = await purchase_product(singleProducts?.id!);
//     if (!purchase_prod) throw new Error();
//     setModalDetails((prev) => {
//       return { ...prev, show: false };
//     });
//     getProducts();
//     refresh!((prev) => !prev);
//   }

//   function showPurchase(product: subProductDetails & productDetails) {
//     setSingleProducts(product);
//     setModalDetails({ show: true, type: "purchase" });
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="flex items-center justify-between px-4 w-full">
//         <HeaderWrapper header="VIP numbers" />
//       </div>
//       <div className="h-[87%] overflow-y-auto text-white remove-scrollbar md:h-[90%]">
//         {products && products![0] ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
//             {products?.map((product) => (
//               <Details
//                 show={false}
//                 details={product}
//                 showPurchase={showPurchase}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center text-center font-semibold text-tex h-[80%] w-full">
//             {loading ? (
//               <span className="loader"></span>
//             ) : (
//               <>
//                 <p>No VIP numbers available at this time.</p>
//                 <ImFilesEmpty className="dropdown-tex" size={40} />
//               </>
//             )}
//           </div>
//         )}
//       </div>
//       <Modal
//         show={modalDetails.show}
//         setShow={(show) => {
//           setModalDetails((prev) => {
//             return { ...prev, show };
//           });
//         }}
//         classes="bg-background2 w-[80%] h-[40%] shadow-2xl md:p-[.1vw] rounded-lg md:w-[30%]"
//       >
//         <PurchaseProduct onPurchase={onPurchase} />
//       </Modal>
//     </PageWrapper>
//   );
// }
