// import React, { useEffect, useState } from "react";
// import { PageWrapper } from "../PageWrapper";
// import { HeaderWrapper } from "../number/HeaderWrapper";
// import { productDetails, subProductDetails } from "../productDetails/type";
// import Details from "./Details";
// import { get_purchased_product } from "@/api/product";
// import { ImFilesEmpty } from "react-icons/im";

// export default function PurchasedProduct() {
//   const [products, setProducts] =
//     useState<(subProductDetails & productDetails)[]>();
//   const [loading, setLoading] = useState<boolean>(true);

//   async function getPurhasedProducts() {
//     const products = await get_purchased_product();
//     setProducts(products);
//     setLoading(false);
//   }

//   useEffect(() => {
//     getPurhasedProducts();
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="flex items-center justify-between h-[9%] px-4 w-full">
//         <HeaderWrapper header="My Purchases" />
//       </div>
//       <div className="h-[87%] overflow-y-auto text-white remove-scrollbar md:h-[90%]">
//         {products && products![0] ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
//             {products?.map((product) => (
//               <Details show={true} details={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center gap-2 text-center font-semibold text-tex h-[80%] w-full">
//             {loading ? (
//               <span className="loader"></span>
//             ) : (
//               <>
//                 <p>No purchased goods found.</p>
//                 <ImFilesEmpty className="dropdown-tex" size={40} />
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </PageWrapper>
//   );
// }
