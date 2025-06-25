import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import "react-day-picker/style.css";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { ReservationWithPoolAndUser } from "../../services/reservations/useReservations";
import { utcToLocal } from "../../types";
import { twMerge } from "tailwind-merge";

export function DayButton(
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
  } & ButtonHTMLAttributes<HTMLButtonElement> & {
      hasReservation: boolean;
    }
) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    day,
    modifiers,
    children,
    className,
    hasReservation,
    ...buttonProps
  } = props;

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      className={twMerge(className, "relative")}
      {...buttonProps}
    >
      {children}
      {hasReservation && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
      )}
    </button>
  );
}

export type DayButtonProps = Parameters<typeof DayButton>[0];
export const Calendar = ({
  value,
  onChange,
  existingReservations,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  existingReservations: ReservationWithPoolAndUser[];
}) => {
  const [month, setMonth] = useState(new Date());

  const handleDayPickerSelect = (date: Date | undefined) => {
    console.log("date", date);
    if (!date) {
      onChange(undefined);
    } else {
      setMonth(date);
      onChange(date);
    }
  };

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      mode="single"
      selected={value}
      disabled={{ dayOfWeek: [0, 6] }}
      onSelect={handleDayPickerSelect}
      components={{
        DayButton: (props) => {
          const dayString = format(props.day.date, "yyyy-MM-dd");
          const hasReservation = existingReservations.some((reservation) => {
            // Convert UTC reservation time to local date for comparison
            const localStart = utcToLocal(reservation.startTime);
            return localStart.date === dayString;
          });
          return <DayButton {...props} hasReservation={hasReservation} />;
        },
      }}
    />
  );
};
