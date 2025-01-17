import React, { useEffect, useState } from "react";
import Frame from "./Frame";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { change_password, getSecureStorageClient } from "@/api/default";
import Link from "next/link";
import { toast } from "react-toastify";
import { User } from "../type";
import { FieldFnType } from "@/components/type";
import { ChangePasswordType } from "@/api/type";
import { FaRegUser } from "react-icons/fa";
import { RiDoorLockLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function Profile() {
  const [userDetail, setUserDetail] = useState<User>({});
  const [passwordField, setPassswordField] = useState({
    current: true,
    new: true,
    confirm: true,
  });

  const validator = Yup.object({
    name: Yup.string()
      .required("This field is required")
      .min(3, "Characters must be greater than 2"),
  });

  const passwordValidator = Yup.object({
    current_password: Yup.string()
      .required("This field is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/gi,
        "Must include upper-Case, lower-case, number and special character"
      )
      .min(10, "characters must be greater than 9"),
    new_password: Yup.string()
      .required("This field is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/gi,
        "Must include upper-Case, lower-case, number and special character"
      )
      .min(10, "characters must be greater than 9"),
    confirm_password: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("new_password")], "Passwords must match"),
  });

  async function setUserInfo() {
    const user = await getSecureStorageClient("token");
    setUserDetail(user!.user);
  }

  async function handleSavePassword(
    values: ChangePasswordType,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (arg: boolean) => void;
      resetForm: (
        nextValues?: FormikValues,
        nextErrors?: any,
        nextTouched?: any
      ) => void;
    }
  ) {
    const res = await change_password(values);
    if (res) {
      setSubmitting(false);
      resetForm();
      toast.success("Password changed successfully");
    }
  }

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <div className="flex flex-col gap-[2rem] md:gap-[2vw]">
      <Frame>
        <>
          <div className="flex items-center gap-[1rem] md:gap-[1vw]">
            <FaRegUser className="text-tex" size={24} />
            <p className="font-semibold text-xl md:text-[1vw]">Basic info</p>
          </div>
          <Formik
            initialValues={userDetail}
            enableReinitialize
            validationSchema={validator}
            onSubmit={() => {}}
          >
            {() => (
              <Form className="flex flex-col gap-[2rem] md:gap-[2vw]">
                <div className="flex gap-[2rem] items-center">
                  <div>
                    <div className="rounded-full w-[3rem] h-[3rem] border-2 border-background2 p-1 md:w-[4vw] md:h-[4vw]">
                      <img
                        src="/user.jpg"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 gap-[1vw]">
                    <h2 className="font-bold text-xl md:text-[1vw]">
                      Profile picture
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-[2rem] justify-between md:flex-row md:gap-0">
                  <div className="flex flex-col gap-2 w-full md:w-[45%] md:gap-[.9rem]">
                    <label
                      htmlFor="name"
                      className="font-semibold text-sm md:text-[.9rem]"
                    >
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      disabled
                      className="bg-[#D7DDE2] text-black outline-none p-2 w-full md:p-[.6vw] md:placeholder:text-[1vw] md:text-[.9rem]"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-xs md:text-[.9rem]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 md:w-[45%] md:gap-[.9rem]">
                    <label
                      htmlFor="email"
                      className="font-semibold text-sm md:text-[.9rem]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue={userDetail.email}
                      disabled
                      className="bg-[#D7DDE2] text-black outline-none p-2 w-full md:p-[.6vw] md:placeholder:text-[1vw] md:text-[.9rem] cursor-not-allowed"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      </Frame>
      <Frame>
        <>
          <div className="flex items-center gap-[1rem] md:gap-[.8rem]">
            <RiDoorLockLine className="text-tex" size={24} />
            <p className="font-semibold text-xl md:text-[.8rem]">
              Password change
            </p>
          </div>
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password: "",
            }}
            enableReinitialize
            validationSchema={passwordValidator}
            onSubmit={handleSavePassword}
          >
            {({ resetForm, isSubmitting, dirty }) => (
              <Form className="flex flex-col gap-[2rem] md:gap-[2vw]">
                <div className="flex flex-col gap-2 md:gap-[.8rem]">
                  <label
                    htmlFor="current_password"
                    className="font-semibold text-sm md:text-[.8rem]"
                  >
                    Current Password
                  </label>
                  <div className="flex flex-col gap-[1rem] md:gap-[.8rem] md:items-center md:flex-row">
                    <Field name="current_password">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex gap-2 px-3 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <RiDoorLockLine className="text-tex" size={24} />
                          {passwordField.current ? (
                            <input
                              type="password"
                              placeholder="Current Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Current Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setPassswordField((prevState) => {
                                return {
                                  ...prevState,
                                  current: !prevState.current,
                                };
                              })
                            }
                          >
                            {passwordField.current ? (
                              <MdOutlineVisibility className="text-tex" />
                            ) : (
                              <AiOutlineEyeInvisible className="text-tex" />
                            )}
                          </button>
                        </div>
                      )}
                    </Field>
                    <Link
                      href="#"
                      className="text-[#034AA6] hidden text-sm md:text-[.8rem] md:inline-block"
                    >
                      forgot password?
                    </Link>
                  </div>
                  <ErrorMessage
                    name="current_password"
                    component="div"
                    className="text-red-600 text-xs md:text-[.8rem]"
                  />
                  <Link
                    href="#"
                    className="text-[#034AA6] text-sm md:text-[.8rem] md:hidden"
                  >
                    forgot password?
                  </Link>
                </div>
                <div className="flex flex-col gap-[1rem] md:flex-row md:gap-2rem md:items-center md:justify-between">
                  <div className="flex flex-col w-full gap-2 md:w-[45%] md:gap-[.8rem]">
                    <label
                      htmlFor="new_password"
                      className="font-semibold text-sm md:text-[.8rem]"
                    >
                      New Password
                    </label>
                    <Field name="new_password">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex gap-2 px-3 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <RiDoorLockLine className="text-tex" size={24} />
                          {passwordField.new ? (
                            <input
                              type="password"
                              placeholder="New Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="New Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setPassswordField((prevState) => {
                                return {
                                  ...prevState,
                                  new: !prevState.new,
                                };
                              })
                            }
                          >
                            {passwordField.new ? (
                              <MdOutlineVisibility className="text-tex" />
                            ) : (
                              <AiOutlineEyeInvisible className="text-tex" />
                            )}
                          </button>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8rem]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-[45%] md:gap-[.8rem]">
                    <label
                      htmlFor="confirm_password"
                      className="font-semibold text-sm md:text-[.8rem]"
                    >
                      Confirm New Password
                    </label>
                    <Field name="confirm_password">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex gap-2 px-3 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <RiDoorLockLine className="text-tex" size={24} />
                          {passwordField.confirm ? (
                            <input
                              type="password"
                              placeholder="Confirm New Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Confirm Password"
                              {...field}
                              className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8rem] md:text-[.8rem]"
                            />
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setPassswordField((prevState) => {
                                return {
                                  ...prevState,
                                  confirm: !prevState.confirm,
                                };
                              })
                            }
                          >
                            {passwordField.confirm ? (
                              <MdOutlineVisibility className="text-tex" />
                            ) : (
                              <AiOutlineEyeInvisible className="text-tex" />
                            )}
                          </button>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="text-red-600 text-xs md:text-[1vw]"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="flex gap-[2rem] justify-between">
                    <button
                      disabled={isSubmitting || !dirty}
                      className={`${
                        isSubmitting || !dirty
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } bg-[#D7DDE2] text-black rounded-xl px-6 py-3 md:px-[2vw] md:py-[.8vw] md:text-[.9rem]`}
                      onClick={() => resetForm()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !dirty}
                      className={`${
                        isSubmitting || !dirty
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } bg-[#034AA6] text-white rounded-xl px-6 py-3 md:px-[2vw] md:py-[.8vw] md:text-[.9rem]`}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      </Frame>
    </div>
  );
}
