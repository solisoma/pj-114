// import React, { useEffect, useState } from "react";
// import { PageWrapper } from "../PageWrapper";
// import { HeaderWrapper } from "../number/HeaderWrapper";
// import { IconStore, productFilter } from "@/utils/productDetails";
// import ViewProduct from "../viewProduct/ViewProduct";
// import Modal from "../Pop";
// import EditproductForm from "./EditproductForm";
// import { productDetails, subProductDetails } from "./type";
// import AddSubProductForm from "./AddSubProductForm";
// import Details from "./Details";
// import { AddProductType, Categories, EditProductType } from "@/api/type";
// import {
//   add_product,
//   add_sub_product,
//   edit_product,
//   get_product,
// } from "@/api/product";
// import { toast } from "react-toastify";
// import { FormikHelpers } from "formik";
// import AddProductForm from "./AddProductForm";
// import { ImFilesEmpty } from "react-icons/im";
// import { IoMdSwap } from "react-icons/io";
// import { IconStoreType } from "@/utils/type";

// export function getIcon(category: string): React.JSX.Element {
//   const iconInfo = IconStore[category as keyof IconStoreType];
//   return <iconInfo.icon size={60} fill={iconInfo.color} />;
// }

// export default function ProductDetails({
//   permission,
//   addProduct,
//   setAddProduct,
//   refresh,
// }: {
//   addProduct?: boolean;
//   setAddProduct?: React.Dispatch<React.SetStateAction<boolean>>;
//   refresh?: React.Dispatch<React.SetStateAction<boolean>>;
//   permission?: string;
// }) {
//   const [showDetails, setShowDetails] = useState<boolean>(false);
//   const [category, setCategory] = useState<string>(Categories.Facebook);
//   const [detailsStore, setDetailsStore] = useState<productDetails[]>();
//   const [details, setDetails] = useState<productDetails[]>();
//   const [singleDetail, setSingleDetail] = useState<productDetails>();
//   const [editProductModal, setEditProductModal] = useState<boolean>(false);
//   const [filter, setFilter] = useState<boolean>(false);
//   const [addProductModal, setaddProductModal] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   function editProduct(detail: productDetails) {
//     setSingleDetail(detail);
//     setEditProductModal(true);
//   }

//   function addSubProduct(detail: productDetails) {
//     setSingleDetail(detail);
//     setaddProductModal(true);
//   }

//   function showSubProduct(detail: productDetails) {
//     setSingleDetail(detail);
//     setShowDetails(true);
//   }

//   async function getProducts() {
//     setLoading(true);
//     const products = await get_product(category as Categories);
//     setDetailsStore(products);
//     setDetails(products);
//     setLoading(false);
//   }

//   function filterProduct(text: string) {
//     if (detailsStore) {
//       const regex = new RegExp(text, "ig");
//       const newData = detailsStore.filter((data) => data.name.match(regex));
//       setDetails([...newData]);
//     }
//   }

//   async function handleSubmit(
//     value: productDetails | subProductDetails,
//     actions: FormikHelpers<any>,
//     type: string
//   ) {
//     switch (type) {
//       case "add-product":
//         const m_val = value as subProductDetails;
//         const add = await add_sub_product({
//           name: singleDetail!.name,
//           preview: m_val.preview,
//           details: m_val.details,
//           productId: singleDetail!.id!,
//         });
//         if (add) {
//           toast.success("Product added successfully");
//           setaddProductModal(false);
//           getProducts();
//           actions.resetForm();
//           return;
//         }
//         toast.error("Product not added");
//         break;
//       case "edit-product":
//         console.log(value);
//         const edit = await edit_product(value as EditProductType);
//         if (edit) {
//           toast.success("Product updated successfully");
//           setEditProductModal(false);
//           getProducts();
//           actions.resetForm();
//           return;
//         }
//         toast.error("Product update failed");
//         break;
//       case "new-product":
//         const addNew = await add_product(value as AddProductType);
//         if (addNew) {
//           toast.success("Product added successfully");
//           setAddProduct!(false);
//           getProducts();
//           actions.resetForm();
//           return;
//         }
//         toast.error("Adding of product failed");
//         break;
//     }
//     actions.setSubmitting(false);
//   }

//   useEffect(() => {
//     getProducts();
//   }, [category]);

//   if (!showDetails)
//     return (
//       <PageWrapper>
//         <div className="flex items-center justify-between h-[9%] md:px-4 w-full">
//           <HeaderWrapper header="Catalogue" />
//           <div className="flex justify-end items-center gap-4 md:w-[50%]">
//             <button>
//               <IoMdSwap
//                 size={30}
//                 color="white"
//                 onClick={() => setFilter((prev) => !prev)}
//               />
//             </button>
//             {filter ? (
//               <input
//                 placeholder="Type to filter"
//                 onChange={(e) => filterProduct(e.target.value)}
//                 className="outline-none p-2 w-[70%] border border-gray-400 text-white bg-background2 rounded-lg md:w-full"
//               />
//             ) : (
//               <select
//                 name="category"
//                 id="category"
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="outline-none w-[70%] p-2 border border-gray-400 text-white bg-background2 rounded-lg md:w-full"
//               >
//                 {productFilter(permission !== "user").map((product) => {
//                   return <option value={product.value}>{product.label}</option>;
//                 })}
//               </select>
//             )}
//           </div>
//         </div>
//         <div className="h-[87%] overflow-y-auto text-white remove-scrollbar md:h-[90%]">
//           {details && details![0] ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
//               {details?.map((detail) => (
//                 <Details
//                   notUser={permission !== "user"}
//                   details={detail}
//                   setEditProductModal={editProduct}
//                   setShowDetails={showSubProduct}
//                   setaddProductModal={addSubProduct}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col justify-center items-center gap-2 text-center font-semibold text-tex h-[80%] w-full">
//               {loading ? (
//                 <span className="loader"></span>
//               ) : (
//                 <>
//                   <p>
//                     No products found for the selected category. Please select
//                     another category using the dropdown above.
//                   </p>
//                   <ImFilesEmpty className="dropdown-tex" size={40} />
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//         <Modal
//           styleString="bg-background2"
//           visible={editProductModal}
//           setVisible={setEditProductModal}
//         >
//           <div className="flex flex-col gap-6 h-[87%] overflow-y-auto px-2">
//             <EditproductForm
//               singleDetail={singleDetail!}
//               onSubmit={handleSubmit}
//             />
//           </div>
//         </Modal>
//         <Modal
//           styleString="bg-background2"
//           visible={addProductModal}
//           setVisible={setaddProductModal}
//         >
//           <div>
//             <AddSubProductForm onSubmit={handleSubmit} />
//           </div>
//         </Modal>
//         <Modal
//           styleString="bg-background2"
//           visible={addProduct!}
//           setVisible={setAddProduct!}
//         >
//           <div className="flex flex-col gap-6 h-[87%] overflow-y-auto px-2">
//             <AddProductForm
//               notUser={permission !== "user"}
//               onSubmit={handleSubmit}
//             />
//           </div>
//         </Modal>
//       </PageWrapper>
//     );
//   return (
//     <ViewProduct
//       notUser={permission !== "user"}
//       details={singleDetail!}
//       setShowDetails={setShowDetails}
//       refresh={refresh}
//       updateCat={getProducts}
//     />
//   );
// }
