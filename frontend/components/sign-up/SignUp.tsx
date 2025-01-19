"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../Button";
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "../Error";
import { sign_up } from "@/api/default";
import { getSecureStorage } from "@/api/auth";
import { FieldFnType } from "../type";
import { LuCircleUser } from "react-icons/lu";
import {
  MdAlternateEmail,
  MdLocationPin,
  MdOutlineVisibility,
} from "react-icons/md";
import { MdEmojiFlags } from "react-icons/md";
import { MdOutlineSpeakerPhone } from "react-icons/md";
import { countryList, Gender } from "@/utils/info";
import { TbPasswordFingerprint } from "react-icons/tb";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {
  const [loading, setLoading] = useState(true);
  const [passwordField, setPassswordField] = useState(true);
  const [confirmPasswordField, setConfirmPassswordField] = useState(true);
  const [apiError, setApiError] = useState({ state: false, msg: "" });
  const router = useRouter();
  const searchParams = useSearchParams();

  const validator = Yup.object({
    name: Yup.string()
      .required("This field is required")
      .min(3, "Characters must be greater than 2"),
    email: Yup.string()
      .required("This field is required")
      .email("Invalid email format"),
    address: Yup.string().required("This field is required"),
    gender: Yup.string().required("This field is required"),
    country: Yup.string().required("This field is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Phone number must be a valid 10-digit number with optional country code"
      ),
    password: Yup.string()
      .required("This field is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])/gi,
        "Must include upper-Case, lower-case, number and special character"
      )
      .min(10, "characters must be greater than 9"),
    confirm_password: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    country: "",
    gender: "",
    address: "",
    confirm_password: "",
    remember: false,
    referral_id: "",
  };

  async function handleSubmit(
    values: typeof initialValues, // Form values typed as FormValues
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) {
    try {
      setApiError((prev) => {
        return { ...prev, state: false };
      });
      const path = localStorage.getItem("path") || "/dashboard?page=overview";
      const { confirm_password, ...details } = values;
      const ref = searchParams.get("ref");
      if (ref) {
        details.referral_id = ref;
      }
      await sign_up(details, router);
      setSubmitting(false);
      localStorage.clear();
      router.push(path);
    } catch (e: any) {
      setApiError({ state: true, msg: e.message });
    }
  }

  async function isLoggedIn() {
    const isActive = await getSecureStorage("token");
    if (isActive) {
      router.push("/dashboard?page=collection");
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (loading) return null;

  return (
    <div className="flex h-full justify-center md:items-center md:pt-0">
      <div className="flex h-full px-4 w-full flex-col gap-4 justify-between md:h-[95%] md:gap-0 md:w-[75%] md:px-0">
        <div>
          <h1 className="font-bold text-[#121519] text-2xl pb-3 py-2 md:pb-0 md:text-[2.3vw] md:py-[1.2vw]">
            Create an Account
          </h1>
          <div className="flex gap-4">
            <p className="font-medium text-base text-[#969696] md:leading-[2.7vw] md:text-[.9vw]">
              Already have an account?
            </p>
            <Link
              href="/account/sign-in"
              className="underline font-medium text-base text-[#034AA6] md:leading-[2.7vw] md:text-[.9vw]"
            >
              Sign in here!
            </Link>
          </div>
        </div>
        {apiError.state && <Error msg={apiError.msg} />}
        <Formik
          initialValues={initialValues}
          validationSchema={validator}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full justify-between md:gap-[.6vw] md:flex-row md:justify-start">
                  <div className="flex-1 flex flex-col md:gap-[.6vw] text-black">
                    <Field name="name">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <LuCircleUser size={24} color="#969696" />
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
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
                  <div className="flex-1 flex flex-col md:gap-[.6vw]">
                    <Field name="email">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <MdAlternateEmail size={24} color="#969696" />
                          <input
                            type="text"
                            placeholder="Email address"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8vw]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full justify-between md:gap-[.6vw] md:flex-row md:justify-start">
                  <div className="flex-1 flex flex-col md:gap-[.6vw] text-black">
                    <Field name="country">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <MdEmojiFlags size={24} color="#969696" />
                          <select
                            name="country"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:text-[.8vw] md:placeholder:text-[.8vw]"
                          >
                            <option
                              className="text-[#969696]"
                              value=""
                              disabled
                              selected
                            >
                              Select your country
                            </option>
                            {countryList.map((itm, id) => (
                              <option key={id} value={itm.value}>
                                {itm.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </Field>

                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8vw]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col md:gap-[.6vw] text-black">
                    <Field name="phone_number">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <MdOutlineSpeakerPhone size={24} color="#969696" />
                          <input
                            type="text"
                            placeholder="Phone number"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8vw]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full justify-between md:gap-[.6vw] md:flex-row md:justify-start">
                  <div className="flex-1 flex flex-col md:gap-[.6vw] text-black">
                    <Field name="gender">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl`}
                        >
                          <MdEmojiFlags size={24} color="#969696" />
                          <select
                            name="country"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:text-[.8vw] md:placeholder:text-[.8vw]"
                          >
                            <option
                              className="text-[#969696]"
                              value=""
                              disabled
                              selected
                            >
                              Select your Gender
                            </option>
                            {Gender.map((itm, id) => (
                              <option key={id} value={itm.value}>
                                {itm.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8vw]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col md:gap-[.6vw]">
                    <Field name="address">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex w-full gap-2 px-2 border-2 ${
                            meta.error && meta.touched
                              ? "border-red-600"
                              : "border-[#f3f2f3]"
                          } items-center rounded-xl text-black`}
                        >
                          <MdLocationPin size={24} color="#969696" />
                          <input
                            type="text"
                            placeholder="Address"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-600 text-xs md:text-[.8vw]"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:gap-[.6vw]">
                  <Field name="password">
                    {({ field, meta }: FieldFnType) => (
                      <div
                        className={`flex gap-2 px-3 border-2 ${
                          meta.error && meta.touched
                            ? "border-red-600"
                            : "border-[#f3f2f3]"
                        } items-center rounded-xl text-black`}
                      >
                        <TbPasswordFingerprint size={24} color="#969696" />
                        {passwordField ? (
                          <input
                            type="password"
                            placeholder="Password"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder="Password"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => setPassswordField(!passwordField)}
                        >
                          {passwordField ? (
                            <MdOutlineVisibility className="text-tex" />
                          ) : (
                            <AiOutlineEyeInvisible className="text-tex" />
                          )}
                        </button>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-xs md:text-[.8vw]"
                  />
                </div>
                <div className="flex flex-col md:gap-[.6vw]">
                  <Field name="confirm_password">
                    {({ field, meta }: FieldFnType) => (
                      <div
                        className={`flex gap-2 px-3 border-2 ${
                          meta.error && meta.touched
                            ? "border-red-600"
                            : "border-[#f3f2f3]"
                        } items-center rounded-xl text-black`}
                      >
                        <TbPasswordFingerprint size={24} color="#969696" />
                        {confirmPasswordField ? (
                          <input
                            type="password"
                            placeholder="Confirm password"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder="Confirm password"
                            {...field}
                            className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmPassswordField(!confirmPasswordField)
                          }
                        >
                          {passwordField ? (
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
                    className="text-red-600 text-xs md:text-[.8vw]"
                  />
                </div>
                <div className="flex gap-1">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="md:w-[.7vw] cursor-pointer"
                  />
                  <p className="font-medium text-base text-[#576071] md:text-[.8vw]">
                    Keep me signed in
                  </p>
                </div>
                <Button
                  submit
                  type="background"
                  disabled={!dirty || !isValid || isSubmitting}
                  text="Sign up"
                  style={`${
                    !dirty || !isValid || isSubmitting
                      ? "from-gray-300 to-gray-300"
                      : "from-[#00CCFF] to-[#034AA6]"
                  }  py-3 px-4 text-center rounded-2xl md:px-[.7vw] md:py-[.7vw] md:text-[1vw]`}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
