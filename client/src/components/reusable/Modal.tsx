import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",

  lg: "max-w-3xl", // increased from 2xl
  xl: "max-w-6xl", // increased from 4xl
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-700 opacity-50 backdrop-blur-sm" />

      {/* Modal Content */}
      
<div
  className={`relative z-10 ${sizeMap[size]} max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6`}
>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="float-right text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-white"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pr-8">
          {title}
        </h2>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
