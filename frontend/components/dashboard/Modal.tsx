import React, { useEffect } from "react";
import { ModalType } from "./type";
import { MdOutlineCancel } from "react-icons/md";

const Modal: React.FC<ModalType> = ({
  children,
  show,
  classes,
  setShow,
  onClose,
}) => {
  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  function closeModal() {
    if (onClose) onClose();
    setShow(false);
  }

  const Children = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, { closeModal })
      : child
  );

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={closeModal} // Close modal on backdrop click
    >
      <div
        className={`relative ${classes || "bg-white rounded-lg p-4 shadow-lg"}`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <MdOutlineCancel size={24} />
        </button>
        {Children}
      </div>
    </div>
  );
};

export default Modal;
