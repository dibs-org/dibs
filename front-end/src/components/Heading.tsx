import React from "react";
import { twMerge } from "tailwind-merge";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export type HeadingProps<T extends React.ElementType> = {
  as?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const sizeClasses: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

export const makeHeadingClasses = (args?: { size: Size }) => {
  const { size = "md" } = args ?? {};

  return twMerge(
    "font-semibold text-gray-900 dark:text-gray-100 tracking-tight",
    sizeClasses[size]
  );
};

const Heading = <T extends React.ElementType = "h1">({
  as,
  size = "md",
  className,
  children,
  ...props
}: HeadingProps<T>) => {
  const Component = as || "h1";
  const combinedClasses = makeHeadingClasses({ size });

  return (
    <Component className={twMerge(combinedClasses, className)} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
