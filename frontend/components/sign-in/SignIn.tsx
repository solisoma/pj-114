"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from "formik";
import Link from "next/link";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "../Error";
import { sign_in } from "@/api/default";
import { getSecureStorage } from "@/api/auth";
import { FieldFnType } from "../type";
import { MdAlternateEmail, MdOutlineVisibility } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn() {
  const [passwordField, setPassswordField] = useState(true);
  const [apiError, setApiError] = useState({ state: false, msg: "" });
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const validator = Yup.object({
    email: Yup.string()
      .required("This field is required")
      .email("Invalid email format"),
    password: Yup.string().required("This field is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    remember: false,
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
      await sign_in(values);
      setSubmitting(false);
      localStorage.clear();
      router.push(path);
    } catch (e: any) {
      setApiError({ state: true, msg: e.message });
    }
  }

  async function isLoggedIn() {
    const is_redirect = params.get("q");
    const isActive = await getSecureStorage("token");
    if (isActive && !is_redirect) {
      router.push("/dashboard?page=overview");
    } else {
      const googleAuthFailed = params.get("r_id");
      if (googleAuthFailed)
        setApiError({
          state: true,
          msg: "An account with this email already exists. Please log in using your email and password.",
        });
      setLoaded(true);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    loaded && (
      <div className="flex h-full justify-center md:items-center md:h-[89%]">
        <div className="flex h-[90%] px-4 mt-10 w-full flex-col gap-4 justify-between md:w-[60%] md:px-0 md:mt-0">
          <div>
            <h1 className="font-bold text-[#121519] text-2xl pb-3 py-2 md:pb-0 md:text-[2.3vw] md:py-[1.2vw]">
              Sign into Account
            </h1>
            <div className="flex gap-4">
              <p className="font-medium text-[#969696] text-sm md:leading-[2.7vw] md:text-[.9vw]">
                Don’t have an account yet?
              </p>
              <Link
                href="/account/sign-up"
                className="underline font-medium text-[#034AA6] text-sm md:leading-[2.7vw] md:text-[.9vw]"
              >
                Register here!
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
                  <div className="flex flex-col md:gap-[.6vw] text-black">
                    <Field name="email">
                      {({ field, meta }: FieldFnType) => (
                        <div
                          className={`flex gap-2 px-2 border-2 ${
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
                            className="outline-none p-3 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
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
                              className="outline-none p-2 w-full bg-[inherit] md:p-[.6vw] md:placeholder:text-[.8vw] md:text-[.8vw]"
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
                  <div className="flex justify-between">
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
                    <Link
                      href="#"
                      className="font-medium text-base text-[#034AA6] md:text-[.8vw]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    submit
                    disabled={!isValid || isSubmitting}
                    type="background"
                    text="Sign in"
                    style={`${
                      !isValid || isSubmitting
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
    )
  );
}
