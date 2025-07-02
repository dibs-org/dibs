import React from "react";
import { twMerge } from "tailwind-merge";

const Field = ({
  label,
  children,
  errorMessage,
  className,
  style,
}: {
  label?: string;
  children: React.ReactNode;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={twMerge("flex flex-col gap-1.5", className)} style={style}>
      {label && <label className="text-sm">{label}</label>}
      {children}
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default Field;
