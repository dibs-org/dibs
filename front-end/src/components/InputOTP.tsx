import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { twMerge } from "tailwind-merge";

type Size = "small" | "medium" | "large";

const sizeClasses: Record<Size, string> = {
  small: "h-6 w-6 text-xs",
  medium: "h-9 w-9 text-sm",
  large: "h-12 w-12 text-lg",
};

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  size?: Size;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={twMerge(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={twMerge("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={twMerge("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  size = "medium",
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  size?: Size;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={twMerge(
        `data-[active=true]:border-blue-500 data-[active=true]:ring-blue-500/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-gray-200 dark:border-gray-900 relative flex items-center justify-center border-y border-r shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]`,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
