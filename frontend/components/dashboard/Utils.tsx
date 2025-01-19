import Button from "@/components/Button";
import React from "react";
import { toast } from "react-toastify";
import { LogOutActionType } from "./type";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { FieldFnType } from "@/components/type";

export function LogOutAction({
  closeModal,
  onLogOut,
}: LogOutActionType): React.JSX.Element {
  async function handleLogOut() {
    try {
      await onLogOut!();
      closeModal!();
      toast.success("Logged out Successfully");
    } catch (e) {
      toast.error("Failed to log out try again");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="flex flex-col justify-between w-[80%] h-[60%] md:h-[70%]">
        <div className="flex flex-col gap-2 md:gap-[1vw]">
          <h2 className="font-bold text-xl md:text-[1.4vw] text-white">
            Log out
          </h2>
          <p className="text-[#969696] font-bold md:text-[.9vw]">
            Are you sure you want to log out?
          </p>
        </div>
        <div className="flex justify-end gap-3 md:gap-[.7vw]">
          <Button
            onClick={handleLogOut}
            text="Log out"
            type="background"
            url="#"
            style="from-tex to-tex py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
        </div>
      </div>
    </div>
  );
}

export function DeleteWallet({
  closeModal,
  onDelete,
}: LogOutActionType): React.JSX.Element {
  async function handleLogOut() {
    await onDelete!();
    closeModal!();
  }

  return (
    <div className="flex items-center justify-center h-[95%] p-6">
      <div className="flex flex-col justify-between gap-6 w-[80%] h-full">
        <div className="flex flex-col gap-2 md:gap-[.8vw]">
          <h2 className="font-bold text-xl md:text-[1.2vw] text-white">
            Delete wallet
          </h2>
          <p className="text-[#969696] text-sm font-bold md:text-[.8vw]">
            Are you sure you want to delete wallet?
          </p>
        </div>
        <div className="flex justify-end gap-3 md:gap-[.7vw]">
          <Button
            onClick={handleLogOut}
            text="Delete"
            type="background"
            url="#"
            style="from-background2 to-background2 py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
        </div>
      </div>
    </div>
  );
}

export function PurchaseProduct({
  closeModal,
  onPurchase,
}: LogOutActionType): React.JSX.Element {
  async function handleLogOut() {
    try {
      await onPurchase!();
      closeModal!();
      toast.success("Product purchased successfully");
    } catch (e) {
      toast.error("Failed to purchase please check your balance and try again");
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="flex flex-col justify-between w-[80%] h-[60%] md:h-[70%]">
        <div className="flex flex-col gap-2 md:gap-[.8vw]">
          <h2 className="font-bold text-xl md:text-[1.4vw] text-white">
            Purchase product
          </h2>
          <p className="text-[#969696] font-bold md:text-[1.4vw]">
            Are you sure you want to purchase this product?
          </p>
        </div>
        <div className="flex justify-end gap-3 md:gap-[.7vw]">
          <Button
            onClick={handleLogOut}
            text="Purchase"
            type="background"
            url="#"
            style="from-tex to-tex py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[1.2vw]"
          />
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[1.2vw]"
          />
        </div>
      </div>
    </div>
  );
}

export function AdminActions({
  closeModal,
  onAction,
  command,
}: LogOutActionType & { command: string }): React.JSX.Element {
  async function handleLogOut() {
    try {
      await onAction!();
      closeModal!();
      toast.success(`Your command executed successfully`);
    } catch (e) {
      toast.error(`Your command failed to execute`);
    }
  }

  return (
    <div className="flex items-center justify-center h-[95%]">
      <div className="flex flex-col justify-between w-[80%] h-[60%] md:h-[70%]">
        <div className="flex flex-col gap-2 md:gap-[.8vw]">
          <h2 className="font-bold text-xl md:text-[1vw] text-white">
            {command === "permission"
              ? "Change user permission"
              : "Change user kyc status"}
          </h2>
          <p className="text-[#969696] font-bold md:text-[1vw]">
            Are you sure you want to execute this command?
          </p>
        </div>
        <div className="flex justify-end gap-3 md:gap-[.7vw]">
          <Button
            onClick={handleLogOut}
            text="Execute"
            type="background"
            url="#"
            style="from-tex to-tex py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
          <Button
            onClick={() => closeModal!()}
            text="Cancel"
            type="background"
            url="#"
            style="from-btn to-btn py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
          />
        </div>
      </div>
    </div>
  );
}

export default function UpdateBalance({
  closeModal,
  onAction,
}: LogOutActionType) {
  const validator = Yup.object({
    amount: Yup.number().required("This field is required"),
    isAdd: Yup.boolean(),
  });

  const initialValue = {
    amount: 0,
    isAdd: true,
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validator}
      enableReinitialize
      onSubmit={(values: FormikValues) => onAction!(values, closeModal!)}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="flex flex-col gap-2 justify-center px-6 h-full">
          <div>
            <div className="mb-4 w-full">
              <label
                className="block text-sm font-medium text-white mb-1 pl-3 md:pl-[.5vw]"
                htmlFor="amount"
              >
                Amount
              </label>
              <Field name="amount">
                {({ field, meta }: FieldFnType) => (
                  <div
                    className={`flex w-full gap-2 px-2 border-2 ${
                      meta.error && meta.touched
                        ? "border-red-600"
                        : "border-[#f3f2f3]"
                    } items-center rounded-xl`}
                  >
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      min="0"
                      {...field}
                      className="outline-none p-2 bg-[inherit] w-full md:p-[.6vw] md:placeholder:text-[1vw] md:text-[1vw]"
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-600 text-xs pl-3 md:pl-[.5vw] md:text-[1vw]"
              />
            </div>
            <div className="flex justify-start w-full">
              <div className="flex gap-1">
                <Field
                  type="checkbox"
                  name="isAdd"
                  className="md:w-[1vw] cursor-pointer"
                />
                <p className="font-medium text-white">Add</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 md:gap-[.7vw]">
            <Button
              onClick={() => closeModal!()}
              text="Cancel"
              type="background"
              url="#"
              style="from-tex to-tex py-3 px-6 transform md:py-[.7vw] md:px-[1.5vw] md:text-[.9vw]"
            />
            <button
              type="submit"
              disabled={isSubmitting || !dirty}
              className={`${
                isSubmitting || !dirty
                  ? "bg-tex cursor-not-allowed"
                  : "bg-background2"
              } w-full text-white py-2 rounded-md transition duration-200`}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
