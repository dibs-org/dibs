import React from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "@tanstack/react-router";
import { ButtonProps, makeButtonClasses } from "./Button";

type LinkButtonProps = React.ComponentProps<typeof Link> & ButtonProps;

const LinkButton = ({
  className,
  variant = "secondary",
  size = "medium",
  ...props
}: LinkButtonProps) => {
  const combinedClasses = makeButtonClasses({ variant, size });

  return <Link className={twMerge(combinedClasses, className)} {...props} />;
};

export default LinkButton;
