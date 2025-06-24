import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "tertiary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gray-900 hover:bg-gray-800 text-white dark:text-black dark:bg-gray-100 dark:hover:bg-gray-200",
  secondary:
    "bg-surface hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-900",
  tertiary:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
};

const sizeClasses = {
  small: "h-[36px] px-3 text-sm rounded-xl",
  medium: "h-[48px] px-4 text-base rounded-2xl",
  large: "h-[56px] px-6 text-lg rounded-2xl",
};

export const makeButtonClasses = (args?: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) => {
  const { variant = "secondary", size = "medium" } = args ?? {};

  return twMerge(
    "font-medium cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size]
  );
};

const Button = ({
  variant = "secondary",
  size = "medium",
  className,
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const combinedClasses = makeButtonClasses({ variant, size });

  return (
    <button
      className={twMerge(combinedClasses, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
