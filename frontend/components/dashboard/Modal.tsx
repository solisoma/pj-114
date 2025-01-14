import React from "react";
import { ModalType } from "./type";

export default function Modal({
  children,
  show,
  classes,
  setShow,
  onClose,
}: ModalType) {
  function closeModal() {
    if (onClose) onClose();
    setShow(false);
  }

  const Children = React.Children.map(children, (child) =>
    React.cloneElement(child, { closeModal })
  );
  return (
    <div
      className={`absolute top-0 justify-center items-center ${
        show ? "flex" : "hidden"
      } w-full h-[95%] z-10`}
    >
      <div
        className={
          classes
            ? classes
            : "bg-background2 w-full min-h-[60%] shadow-2xl md:p-[2vw] rounded-lg md:w-[50%]"
        }
      >
        {Children}
      </div>
    </div>
  );
}
