import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { announcementDetails } from "./type";
import * as Yup from "yup";
import { FieldFnType } from "@/components/type";

export default function EditAnnouncementForm({
  singleDetail,
  onSubmit,
}: {
  singleDetail: announcementDetails;
  onSubmit: (
    value: announcementDetails,
    actions: FormikHelpers<announcementDetails>,
    type: string
  ) => void;
}) {
  const validator = Yup.object({
    title: Yup.string().required("This field is required"),
    content: Yup.string().required("This field is required"),
    published: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={singleDetail}
      validationSchema={validator}
      enableReinitialize
      onSubmit={(
        values: announcementDetails,
        actions: FormikHelpers<announcementDetails>
      ) => {
        onSubmit(values, actions, "edit-announcement");
      }}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Form className="text-white flex flex-col items-start gap-4">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="title">Title:</label>
              <Field name="title">
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
                      placeholder="Announcement Title"
                      {...field}
                      className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <label htmlFor="content">Content:</label>
              <Field name="content">
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
                name="content"
                component="div"
                className="text-red-600 text-xs md:text-[1vw]"
              />
            </div>
            <div className="flex justify-start w-full">
              <div className="flex gap-1">
                <Field
                  type="checkbox"
                  name="published"
                  className="md:w-[1vw] cursor-pointer"
                />
                <p className="font-medium text-white">Publish</p>
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
                Update
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
