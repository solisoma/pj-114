import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { productDetails } from "./type";
import * as Yup from "yup";
import { FieldFnType } from "@/components/type";
import { Categories } from "@/api/type";
import { productFilter } from "@/utils/productDetails";

export default function AddProductForm({
  notUser,
  onSubmit,
}: {
  notUser: boolean;
  onSubmit: (
    value: productDetails,
    actions: FormikHelpers<productDetails>,
    type: string
  ) => void;
}) {
  const validator = Yup.object({
    name: Yup.string().required("This field is required"),
    desc: Yup.string().required("This field is required"),
    price: Yup.number().required("This field is required"),
    isActive: Yup.boolean(),
  });

  const initialValues: productDetails = {
    name: "",
    desc: "",
    category: Categories.Facebook,
    price: 0,
    isActive: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validator}
      enableReinitialize
      onSubmit={(
        values: productDetails,
        actions: FormikHelpers<productDetails>
      ) => {
        console.log(values);
        onSubmit(values, actions, "new-product");
      }}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Form className="text-white flex flex-col items-start gap-4">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="name">Product name:</label>
              <Field name="name">
                {({ field, meta }: FieldFnType) => (
                  <div
                    className={`flex w-full px-2 border-2 ${
                      meta.error && meta.touched
                        ? "border-red-600"
                        : "border-[#f3f2f3]"
                    } rounded-xl`}
                  >
                    <input
                      type="text"
                      placeholder="Product name"
                      {...field}
                      className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="desc">Description:</label>
              <Field name="desc">
                {({ field, meta }: FieldFnType) => (
                  <div
                    className={`flex w-full px-2 border-2 ${
                      meta.error && meta.touched
                        ? "border-red-600"
                        : "border-[#f3f2f3]"
                    } rounded-xl`}
                  >
                    <textarea
                      placeholder="Description"
                      {...field}
                      className="outline-none resize-none p-3 w-full h-[7rem] bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="desc"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="category">Category:</label>
              <Field name="category">
                {({ field, meta }: FieldFnType) => (
                  <div
                    className={`flex w-full px-2 border-2 ${
                      meta.error && meta.touched
                        ? "border-red-600"
                        : "border-[#f3f2f3]"
                    } rounded-xl`}
                  >
                    <select
                      {...field}
                      className="outline-none p-3 w-full bg-background2 md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    >
                      {productFilter(notUser).map((product) => (
                        <option value={product.value}>{product.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="price">Price:</label>
              <Field name="price">
                {({ field, meta }: FieldFnType) => (
                  <div
                    className={`flex w-full px-2 border-2 ${
                      meta.error && meta.touched
                        ? "border-red-600"
                        : "border-[#f3f2f3]"
                    } rounded-xl`}
                  >
                    <input
                      type="number"
                      placeholder="23"
                      {...field}
                      className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex justify-start w-full">
              <div className="flex gap-1">
                <Field
                  type="checkbox"
                  name="isActive"
                  className="md:w-[1vw] cursor-pointer"
                />
                <p className="font-medium text-white">Broadcast</p>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                disabled={!dirty || !isValid || isSubmitting}
                className={`${
                  !dirty || !isValid || isSubmitting
                    ? "cursor-not-allowed bg-tex"
                    : "bg-btn"
                } p-2 rounded-lg text-white w-[5rem]`}
                type="submit"
              >
                Add
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
