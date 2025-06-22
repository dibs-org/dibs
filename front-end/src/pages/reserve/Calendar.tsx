import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import "react-day-picker/style.css";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useReservations } from "../../services/reservation/useReservations";
import { twMerge } from "tailwind-merge";

export function DayButton(
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
  } & ButtonHTMLAttributes<HTMLButtonElement> & {
      isReserved: boolean;
    }
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { day, modifiers, children, className, isReserved, ...buttonProps } =
    props;

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      className={twMerge(
        className,
        isReserved && "!text-red-500 !bg-red-500/20"
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export type DayButtonProps = Parameters<typeof DayButton>[0];
export const Calendar = ({
  value,
  onChange,
  listingId,
}: {
  value: string | undefined;
  onChange: (date: string | undefined) => void;
  listingId: string;
}) => {
  const { data: existingReservations = [] } = useReservations({
    listingId,
  });
  const [month, setMonth] = useState(new Date());

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined);
    } else {
      const formattedDate = format(date, "yyyy-MM-dd");
      setMonth(date);
      onChange(formattedDate);
    }
  };

  return (
    <div>
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        mode="single"
        timeZone="UTC"
        selected={value ? new Date(value) : undefined}
        disabled={{ dayOfWeek: [0, 6] }}
        onSelect={handleDayPickerSelect}
        components={{
          DayButton: (props) => {
            const isReserved = existingReservations.some(
              (reservation) =>
                reservation.date === format(props.day.date, "yyyy-MM-dd")
            );
            return (
              <DayButton
                {...props}
                disabled={isReserved}
                isReserved={isReserved}
              />
            );
          },
        }}
      />
      {/* <pre>{JSON.stringify({ existingReservations }, null, 2)}</pre> */}
    </div>
  );
};
