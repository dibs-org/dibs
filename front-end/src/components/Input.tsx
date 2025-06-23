import React from "react";
import { twMerge } from "tailwind-merge";

type Size = "small" | "medium" | "large";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: Size;
  className?: string;
};

const sizeClasses: Record<Size, string> = {
  small: "h-[36px] px-3 text-sm",
  medium: "h-[48px] px-4 text-base",
  large: "h-[56px] px-6 text-lg",
};

export const makeInputClasses = (args?: { size: InputProps["size"] }) => {
  const { size = "medium" } = args ?? {};

  return twMerge(
    "rounded-2xl border border-gray-200 dark:border-gray-900 bg-surface text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] focus:outline-none",
    sizeClasses[size]
  );
};

const Input = ({ size = "medium", className, ...props }: InputProps) => {
  const combinedClasses = twMerge(makeInputClasses({ size }), className);

  return <input className={combinedClasses} {...props} />;
};

export default Input;
