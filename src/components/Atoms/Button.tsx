

import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button = ({ label, onClick, type = "button", className = "" }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition ${className}`}
    >
      {label}
    </button>
  );
};