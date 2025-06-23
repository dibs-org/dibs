import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import "react-day-picker/style.css";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { ReservationWithListingAndHostUserAndRenterUser } from "../../services/reservation/useReservations";
import { twMerge } from "tailwind-merge";
import { dateStringToDate, dateToDateString } from "./utils";

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
  value: string | undefined;
  onChange: (date: string | undefined) => void;
  existingReservations: ReservationWithListingAndHostUserAndRenterUser[];
}) => {
  const [month, setMonth] = useState(new Date());

  const handleDayPickerSelect = (date: Date | undefined) => {
    console.log("date", date);
    if (!date) {
      onChange(undefined);
    } else {
      const formattedDate = dateToDateString(date);
      setMonth(date);
      onChange(formattedDate);
    }
  };

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      mode="single"
      // timeZone="UTC"
      selected={value ? dateStringToDate(value) : undefined}
      disabled={{ dayOfWeek: [0, 6] }}
      onSelect={handleDayPickerSelect}
      components={{
        DayButton: (props) => {
          const hasReservation = existingReservations.some(
            (reservation) =>
              reservation.date === format(props.day.date, "yyyy-MM-dd")
          );
          return <DayButton {...props} hasReservation={hasReservation} />;
        },
      }}
    />
  );
};
