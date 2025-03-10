import React from "react";

const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      style={{ color: "#fafbff" }}
      className={`${className?.includes("border") ? "" : "border-0"} ${
        className?.includes("bg") ? "" : "bg-blue"
      }  px-5 fw-bolder rounded-32 py-3 fs-6 ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
