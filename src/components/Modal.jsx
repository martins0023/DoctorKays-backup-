import React from "react";
import { success } from "../assets";
import { Check } from "lucide-react";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <div className="items-center justify-center flex flex-col">
          <div className="bg-gradient-to-tr from-purple-700 to-purple-100 rounded-full p-2">
          <Check className="text-white-950 w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-black">Success</h2>
          <p className="mb-4 text-black">{message}</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-l from-purple-900 to-purple-400 text-white font-semibold py-2 px-4 rounded-3xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
