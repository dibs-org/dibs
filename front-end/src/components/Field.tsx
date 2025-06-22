import React from "react";

const Field = ({
  label,
  children,
  errorMessage,
}: {
  label?: string;
  children: React.ReactNode;
  errorMessage?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      {children}
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default Field;
