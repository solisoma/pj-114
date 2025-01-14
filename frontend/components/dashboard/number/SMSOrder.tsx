// "use client";
// import React, { useEffect, useState } from "react";
// import { Form, Formik, FormikValues } from "formik";
// import { MdArrowDropDown } from "react-icons/md";
// import {
//   msStaticCountries,
//   msStaticServices,
//   staticCountries,
//   staticServices,
// } from "@/utils/number";
// import { get_info } from "@/api/get.number";
// import { InitialValueType, Provider, ReqNumberType } from "./type";
// import { toast } from "react-toastify";

// const staticHashMap = {
//   lokimobile: {
//     staticCountries,
//     staticServices,
//   },
//   hermes: {
//     staticCountries: msStaticCountries,
//     staticServices: msStaticServices,
//   },
// };

// const SelectBtn = ({
//   text,
//   onClick,
// }: {
//   text: string;
//   onClick: () => void;
// }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className="flex justify-start px-2 py-1 hover:bg-[#3b3b3b]"
//     dangerouslySetInnerHTML={{ __html: text }}
//   ></button>
// );

// function SMSOrder({
//   handleSubmit,
//   provider,
// }: {
//   handleSubmit: (param: ReqNumberType) => Promise<void>;
//   provider: Provider;
// }) {
//   const [cDrop, setCDrop] = useState({ drop: false, text: "Choose country" });
//   const [sDrop, setSDrop] = useState({ drop: false, text: "Choose service" });
//   const [oDrop, setODrop] = useState({ drop: false, text: "Choose operator" });
//   const [gettingInfo, setGettingInfo] = useState(false);
//   const [operators, setOperators] = useState<string[]>();
//   const [countries, setCountries] =
//     useState<{ label: string; value: string; operator?: string[] }[]>();
//   const [services, setSerivces] =
//     useState<{ code: string; f?: number | string; name: string }[]>();
//   const [initialValues, setInitialValues] = useState<InitialValueType>({
//     country: "",
//     service: "",
//     price: "",
//     operator: "",
//     stock: "",
//   });

//   const handleSelectCountry = async ({ target }: { target: any }) => {
//     const regex = new RegExp(target.value, "ig");
//     const newCountries = staticHashMap[provider].staticCountries.filter(
//       (country) => country.label.match(regex)
//     );
//     setCountries([...newCountries]);
//   };

//   const handleSelectService = async ({ target }: { target: any }) => {
//     const regex = new RegExp(target.value, "ig");
//     const newServices = staticHashMap[provider].staticServices.filter(
//       (service) => service.name.match(regex)
//     );
//     setSerivces([...newServices]);
//   };

//   const getInfo = async (
//     country: string,
//     service: string,
//     operator?: string
//   ) => {
//     setGettingInfo(true);
//     if (country && service && (provider !== "hermes" || operator)) {
//       const info = await get_info({ country, service, operator }, provider);

//       setInitialValues((prev) => {
//         return {
//           ...prev,
//           stock: info.count,
//           price: Number(info.cost.toFixed(2)),
//         };
//       });
//     }
//     setGettingInfo(false);
//   };

//   async function submitForm(
//     values: FormikValues,
//     { setSubmitting }: { setSubmitting: (arg: boolean) => void }
//   ) {
//     if (!values.country || !values.service) {
//       toast.info("Some fields are missing");
//       return;
//     }

//     if (provider !== "lokimobile" && !values.operator) {
//       toast.info("Please select an operator");
//       return;
//     }

//     await handleSubmit({
//       country: values.country,
//       price: values.price,
//       operator: values.operator,
//       service: values.service,
//     });
//     setSubmitting(false);
//   }

//   useEffect(() => {
//     setCountries([...staticHashMap[provider].staticCountries.slice(0, 20)]);
//     setSerivces([...staticHashMap[provider].staticServices.slice(0, 20)]);
//     setInitialValues({
//       country: "",
//       service: "",
//       price: "",
//       operator: "",
//       stock: "",
//     });
//     setCDrop({ drop: false, text: "Choose country" });
//     setSDrop({ drop: false, text: "Choose service" });
//     setODrop({ drop: false, text: "Choose operator" });
//   }, [provider]);
//   return (
//     <div className="w-full h-auto flex items-center justify-center">
//       <div className="w-full flex flex-col items-center px-2 gap-4">
//         <div className="border-b w-full border-gray-800 py-2 pb-4 flex items-center justify-start">
//           <h1 className="text-lg font-bold"> Order SMS</h1>
//         </div>
//         <div className="flex flex-col gap-6">
//           <p className="text-[0.9rem]">
//             Order your SMS here, then have a look at your pending SMS to see
//             your current order.
//           </p>
//           <Formik
//             initialValues={initialValues}
//             enableReinitialize
//             onSubmit={submitForm}
//           >
//             {({ isSubmitting, values }) => {
//               return (
//                 <Form className="flex flex-col gap-4">
//                   <div className="flex flex-col gap-2 items-start justify-center">
//                     <label>Country</label>
//                     <div className="flex flex-col w-full gap-2">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setCDrop((prev) => {
//                             return { ...prev, drop: !prev.drop };
//                           })
//                         }
//                         className="flex items-center justify-between p-2 border border-gray-400 rounded-lg w-full bg-background2"
//                       >
//                         <p>{cDrop.text}</p>
//                         <MdArrowDropDown size={24} />
//                       </button>
//                       <div
//                         className={`flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg w-full bg-background2 ${
//                           !cDrop.drop && "hidden"
//                         }`}
//                       >
//                         <input
//                           type="text"
//                           placeholder="Search"
//                           className="outline-none p-1 border border-gray-400 rounded-lg w-full bg-background2"
//                           onInput={handleSelectCountry}
//                         />
//                         <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
//                           {countries?.map((country, i) => (
//                             <SelectBtn
//                               key={country.value}
//                               text={country.label}
//                               onClick={() => {
//                                 setCDrop({ drop: false, text: country.label });
//                                 setInitialValues((prev) => {
//                                   return { ...prev, country: country.value };
//                                 });
//                                 if (country.operator) {
//                                   setOperators(country.operator);
//                                   setODrop({
//                                     drop: false,
//                                     text: "Choose operator",
//                                   });
//                                   initialValues.operator = "";
//                                 }
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2 items-start justify-center">
//                     <label>Service</label>
//                     <div className="flex flex-col w-full gap-2">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setSDrop((prev) => {
//                             return { ...prev, drop: !prev.drop };
//                           })
//                         }
//                         className="flex items-center justify-between p-2 border border-gray-400 rounded-lg w-full bg-background2"
//                       >
//                         <p>{sDrop.text}</p>
//                         <MdArrowDropDown size={24} />
//                       </button>
//                       <div
//                         className={`flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg w-full bg-background2 ${
//                           !sDrop.drop && "hidden"
//                         }`}
//                       >
//                         <input
//                           type="text"
//                           placeholder="Search"
//                           className="outline-none p-1 border border-gray-400 rounded-lg w-full bg-background2"
//                           onInput={handleSelectService}
//                         />
//                         <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
//                           {services?.map((service) => (
//                             <SelectBtn
//                               key={service.code}
//                               text={service.name}
//                               onClick={() => {
//                                 setSDrop({ drop: false, text: service.name });
//                                 setInitialValues((prev) => {
//                                   return {
//                                     ...prev,
//                                     service: service.code,
//                                   };
//                                 });
//                                 getInfo(
//                                   initialValues.country,
//                                   service.code,
//                                   initialValues.operator
//                                 );
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {provider === "hermes" && (
//                     <div className="flex flex-col gap-2 items-start justify-center">
//                       <label>Operator</label>
//                       <div className="flex flex-col w-full gap-2">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setODrop((prev) => {
//                               return { ...prev, drop: !prev.drop };
//                             })
//                           }
//                           className="flex items-center justify-between p-2 border border-gray-400 rounded-lg w-full bg-background2"
//                         >
//                           <p>{oDrop.text}</p>
//                           <MdArrowDropDown size={24} />
//                         </button>
//                         <div
//                           className={`flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg w-full bg-background2 ${
//                             !oDrop.drop && "hidden"
//                           }`}
//                         >
//                           <input
//                             type="text"
//                             placeholder="Search"
//                             className="outline-none p-1 border border-gray-400 rounded-lg w-full bg-background2"
//                             onInput={handleSelectService}
//                           />
//                           <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
//                             {operators?.map((operator, i) => (
//                               <SelectBtn
//                                 key={i}
//                                 text={operator}
//                                 onClick={() => {
//                                   setODrop({ drop: false, text: operator });
//                                   setInitialValues((prev) => {
//                                     return {
//                                       ...prev,
//                                       operator,
//                                     };
//                                   });
//                                   getInfo(
//                                     initialValues.country,
//                                     initialValues.service,
//                                     operator
//                                   );
//                                 }}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div className="flex flex-col gap-2 items-start justify-center">
//                     <label htmlFor="max_price">Stock</label>
//                     <input
//                       type="number"
//                       placeholder=""
//                       value={values.stock}
//                       name="max_price"
//                       disabled
//                       className={`outline-none cursor-not-allowed p-2 ${
//                         gettingInfo && "fade"
//                       } border border-gray-400 rounded-lg w-full bg-background2`}
//                     />
//                   </div>
//                   <div className="flex flex-col gap-2 items-start justify-center">
//                     <label htmlFor="min_price">Price</label>
//                     <div className="flex items-center gap-1 p-2 border border-gray-400 rounded-lg w-full bg-background2">
//                       <p>₦</p>
//                       <input
//                         type="text"
//                         placeholder=""
//                         value={values.price}
//                         disabled
//                         name="min_price"
//                         className={`outline-none cursor-not-allowed ${
//                           gettingInfo && "fade"
//                         }  w-full bg-background2`}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-start gap-4">
//                     <button
//                       disabled={
//                         isSubmitting ||
//                         !Number(initialValues.price) ||
//                         !Number(initialValues.stock)
//                       }
//                       className={`p-2 ${
//                         isSubmitting ||
//                         !Number(initialValues.price) ||
//                         !Number(initialValues.stock)
//                           ? "cursor-not-allowed bg-tex"
//                           : "bg-btn"
//                       } rounded-lg text-white w-[8rem]`}
//                       type="submit"
//                     >
//                       Purchase
//                     </button>
//                   </div>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SMSOrder;
