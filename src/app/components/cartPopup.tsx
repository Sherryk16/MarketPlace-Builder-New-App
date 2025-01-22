import React from "react";

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center w-[300px]">
        <p className="text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
