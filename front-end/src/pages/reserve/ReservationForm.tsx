import "react-day-picker/style.css";
import { useState, useId, useMemo } from "react";
import { useCreateReservation } from "../../services/reservation/useCreateReservation";
import { ReservationRequestFormShape } from "../../types";
import z from "zod/v4";
import Field from "../../components/Field";
import { useListingDetails } from "../../services/listing/useListing";
import { Calendar } from "./Calendar";
import { useReservations } from "../../services/reservation/useReservations";
import DayHourSelector, { formatTimeRange } from "./DayHourSelector";
import { format } from "date-fns";
import { dateStringToDate, dateToDateString } from "./utils";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

type ReservationFormState = {
  date: string | undefined;
  startTime: string;
  endTime: string;
  numberOfGuests: number;
};

type ValueOf<T> = T[keyof T];

const presets = [
  { id: "morning", label: "Morning", start: "08:00", end: "12:00" },
  { id: "lunch", label: "Lunch", start: "12:00", end: "14:00" },
  { id: "afternoon", label: "Afternoon", start: "14:00", end: "18:00" },
  { id: "evening", label: "Evening", start: "18:00", end: "22:00" },
  { id: "custom", label: "Custom" },
];

export const ReservationForm = ({ listingId }: { listingId: string }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { data: listingDetails, isLoading: isLoadingListingDetails } =
    useListingDetails({ listingId });

  const { data: existingReservations = [] } = useReservations({
    listingId,
  });

  const [reservationFormState, setReservationFormState] =
    useState<ReservationFormState>({
      date: dateToDateString(new Date()),
      startTime: "17:00",
      endTime: "18:00",
      numberOfGuests: 1,
    });

  const inputId = useId();

  const {
    mutate: createReservation,
    isPending,
    isSuccess,
    data: successfullyCreatedReservation,
  } = useCreateReservation();

  const handleSubmit = () => {
    try {
      const parsed = ReservationRequestFormShape.parse(reservationFormState);
      createReservation(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          setFieldErrors((prev) => ({
            ...prev,
            [issue.path[0]]: issue.message,
          }));
        });
      }
    }
  };

  const handleDateChange = (
    key: keyof ReservationFormState,
    value: ValueOf<ReservationFormState>
  ) => {
    setReservationFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simply use the input value directly since HTML date inputs are already in YYYY-MM-DD format
    const dateValue = e.target.value;

    if (dateValue) {
      handleDateChange("date", dateValue);
    } else {
      handleDateChange("date", undefined);
    }
  };

  const reservationsForSelectedDate = useMemo(() => {
    return existingReservations.filter(
      (reservation) => reservation.date === reservationFormState.date
    );
  }, [existingReservations, reservationFormState.date]);

  const reservationForm = (
    <>
      <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-800 p-6">
        <h4 className="text-xl font-semibold leading-none">
          Reserve{" "}
          {isLoadingListingDetails ? "Loading..." : listingDetails?.name}
        </h4>
        <p className="text-sm text-gray-500 leading-none">
          {isLoadingListingDetails ? "Loading..." : listingDetails?.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-start p-6">
        {/* Left column */}
        <div className="w-full md:w-[300px]">
          <Calendar
            value={reservationFormState.date}
            onChange={(date) => handleDateChange("date", date)}
            existingReservations={existingReservations}
          />
        </div>
        {/* Right column */}
        <div className="w-full md:w-[300px] flex flex-col gap-4">
          <h4 className="text-sm font-medium leading-none">
            {reservationFormState.date
              ? format(
                  dateStringToDate(reservationFormState.date),
                  "EEEE, MMMM d, yyyy"
                )
              : "Select a date"}
          </h4>
          {reservationsForSelectedDate.length === 0 ? (
            <div className="flex flex-col gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  className={twMerge(
                    "w-full flex justify-between items-center gap-2 h-full bg-bg-surface hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-3.5 cursor-pointer",
                    selectedPreset === preset.id &&
                      "bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200 dark:hover:bg-blue-900/50 border-blue-500/10 dark:border-blue-500/10 shadow-sm"
                  )}
                  onClick={() => {
                    setSelectedPreset(preset.id);
                    if (preset.id === "custom") {
                      handleDateChange("startTime", "08:00");
                      handleDateChange("endTime", "12:00");
                    } else {
                      handleDateChange("startTime", preset.start);
                      handleDateChange("endTime", preset.end);
                    }
                  }}
                >
                  <div className="flex flex-col items-start text-sm">
                    <div className="font-medium">{preset.label}</div>
                    <div className="opacity-50">
                      {preset.start
                        ? formatTimeRange(preset.start, preset.end)
                        : "Select hours"}
                    </div>
                  </div>
                  <div
                    className={
                      selectedPreset === preset.id ? "opacity-100" : "opacity-0"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            reservationsForSelectedDate.map((reservation) => (
              <div
                key={reservation.id}
                className="w-full flex flex-col justify-between gap-2 h-full bg-blue-200/80 dark:bg-blue-800/50 border border-blue-500/10 rounded-lg p-3"
              >
                <div className="flex flex-col">
                  <div className="text-sm leading-none font-medium">
                    {reservation.renterUser?.name}
                    {reservation.numberOfGuests - 1 > 0
                      ? ` & ${reservation.numberOfGuests - 1} others`
                      : ""}
                  </div>
                  <div className="text-xs opacity-50">
                    {formatTimeRange(
                      reservation.startTime,
                      reservation.endTime
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {false && (
            <DayHourSelector
              events={existingReservations.filter(
                (reservation) => reservation.date === reservationFormState.date
              )}
              renderEvent={(reservation) => (
                <div className="w-full flex flex-col justify-between gap-2 h-full bg-blue-200/80 dark:bg-blue-800/50 border border-blue-500/10 rounded-lg p-2">
                  <div className="flex flex-col">
                    <div className="text-xs leading-none font-medium">
                      Reserved by: {reservation.renterUser?.name}
                      {reservation.numberOfGuests - 1 > 0
                        ? ` & ${reservation.numberOfGuests - 1} others`
                        : ""}
                    </div>
                    <div className="text-xs opacity-50">
                      {formatTimeRange(
                        reservation.startTime,
                        reservation.endTime
                      )}
                    </div>
                  </div>
                  {/* <button className="w-full text-blue-800 dark:text-blue-200  bg-blue-500/10 hover:bg-blue-500/20 rounded-md p-2 text-xs border border-blue-500/10">
                  Request to join
                </button> */}
                </div>
              )}
              onSelect={(start, end) => {
                handleDateChange("startTime", start);
                handleDateChange("endTime", end);
              }}
              selectedRange={
                reservationFormState.startTime && reservationFormState.endTime
                  ? {
                      start: reservationFormState.startTime,
                      end: reservationFormState.endTime,
                    }
                  : null
              }
            />
          )}
          {}
          {selectedPreset === "custom" && (
            <>
              <Field label="Date" errorMessage={fieldErrors.date}>
                <input
                  id={inputId}
                  type="date"
                  className="border border-gray-300 dark:border-gray-800 rounded-md p-2"
                  value={reservationFormState.date}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label="Time">
                <div className="flex gap-2 items-center">
                  <Field errorMessage={fieldErrors.startTime}>
                    <input
                      type="time"
                      className="border border-gray-300 dark:border-gray-800 rounded-md p-2 flex-1"
                      value={reservationFormState.startTime}
                      onChange={(e) =>
                        handleDateChange("startTime", e.target.value)
                      }
                    />
                  </Field>
                  <span className="text-xs">to</span>
                  <Field errorMessage={fieldErrors.endTime}>
                    <input
                      type="time"
                      className="border border-gray-300 dark:border-gray-800 rounded-md p-2 flex-1"
                      value={reservationFormState.endTime}
                      onChange={(e) =>
                        handleDateChange("endTime", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </Field>
            </>
          )}
          <Field
            label="Number of Guests"
            errorMessage={fieldErrors.numberOfGuests}
          >
            <div className="flex gap-2 items-center w-full">
              <button
                className="flex items-center justify-center bg-bg-surface border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-full p-2 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() =>
                  handleDateChange(
                    "numberOfGuests",
                    Math.max(
                      reservationFormState.numberOfGuests - 1,
                      MIN_GUESTS
                    )
                  )
                }
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                className="border border-gray-300 dark:border-gray-800 rounded-md p-2 flex-1 text-center"
                value={reservationFormState.numberOfGuests}
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                onChange={(e) =>
                  handleDateChange("numberOfGuests", parseInt(e.target.value))
                }
              />
              <button
                className="flex items-center justify-center bg-bg-surface border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-full p-2 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  handleDateChange(
                    "numberOfGuests",
                    Math.min(
                      reservationFormState.numberOfGuests + 1,
                      MAX_GUESTS
                    )
                  );
                }}
              >
                +
              </button>
            </div>
          </Field>
        </div>
      </div>
      <div className="fixed md:relative bottom-0 left-0 right-0 pt-8 md:pt-6 p-4 md:p-6 bg-gradient-to-b from-transparent to-30% to-bg-default md:bg-transparent md:from-transparent md:to-transparent">
        <Button
          variant="primary"
          className="w-full"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Requesting..." : "Reserve"}
        </Button>
      </div>
    </>
  );

  return (
    <div className="w-full md:w-auto flex flex-col border border-gray-200 dark:border-gray-900 rounded-2xl bg-surface">
      {isSuccess ? (
        <div className="p-6">
          Success{" "}
          <pre>
            {JSON.stringify({ successfullyCreatedReservation }, null, 2)}
          </pre>
        </div>
      ) : (
        reservationForm
      )}
    </div>
  );
};
