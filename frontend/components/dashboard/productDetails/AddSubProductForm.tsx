// import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
// import React from "react";
// import { subProductDetails } from "./type";
// import * as Yup from "yup";
// import { FieldFnType } from "@/components/type";

// const addProductdetails: subProductDetails = {
//   id: 1,
//   preview: "",
//   details: "",
// };

// function AddSubproductForm({
//   onSubmit,
// }: {
//   onSubmit: (
//     value: subProductDetails,
//     actions: FormikHelpers<subProductDetails>,
//     type: string
//   ) => void;
// }) {
//   const validator = Yup.object({
//     details: Yup.string().required("This field is required"),
//   });

//   return (
//     <Formik
//       initialValues={addProductdetails}
//       validationSchema={validator}
//       onSubmit={(
//         values: subProductDetails,
//         actions: FormikHelpers<subProductDetails>
//       ) => {
//         console.log(values);
//         onSubmit(values, actions, "add-product");
//       }}
//     >
//       {({ isSubmitting, isValid, dirty }) => {
//         return (
//           <Form className="text-white flex flex-col items-start gap-4">
//             <div className="flex flex-col gap-1 items-start justify-start w-full">
//               <label htmlFor="preview">Preview:</label>
//               <Field name="preview">
//                 {({ field, meta }: FieldFnType) => (
//                   <div
//                     className={`flex w-full px-2 border-2 ${
//                       meta.error && meta.touched
//                         ? "border-red-600"
//                         : "border-[#f3f2f3]"
//                     } rounded-xl`}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Product name"
//                       {...field}
//                       className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
//                     />
//                   </div>
//                 )}
//               </Field>
//               <ErrorMessage
//                 name="preview"
//                 component="div"
//                 className="text-red-600 text-xs md:text-[1vw]"
//               />
//             </div>
//             <div className="flex flex-col gap-1 items-start justify-start w-full">
//               <label htmlFor="details">Details:</label>
//               <Field name="details">
//                 {({ field, meta }: FieldFnType) => (
//                   <div
//                     className={`flex w-full px-2 border-2 ${
//                       meta.error && meta.touched
//                         ? "border-red-600"
//                         : "border-[#f3f2f3]"
//                     } rounded-xl`}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Product name"
//                       {...field}
//                       className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
//                     />
//                   </div>
//                 )}
//               </Field>
//               <ErrorMessage
//                 name="details"
//                 component="div"
//                 className="text-red-600 text-xs md:text-[1vw]"
//               />
//             </div>
//             <div className="flex justify-end w-full">
//               <button
//                 disabled={!dirty || !isValid || isSubmitting}
//                 className={`${
//                   !dirty || !isValid || isSubmitting
//                     ? "cursor-not-allowed bg-tex"
//                     : "bg-btn"
//                 } p-2 rounded-lg text-white w-[5rem]`}
//                 type="submit"
//               >
//                 Submit
//               </button>
//             </div>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// export default AddSubproductForm;
