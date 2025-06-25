import "react-day-picker/style.css";
import { useState, useId, useMemo } from "react";
import { useCreateReservation } from "../../services/reservations/useCreateReservation";
import {
  type ReservationForm,
  ReservationFormSchema,
  utcToLocal,
} from "../../types";
import z from "zod/v4";
import Field from "../../components/Field";
import { usePool } from "../../services/pools/usePool";
import { Calendar } from "./Calendar";
import { useReservations } from "../../services/reservations/useReservations";
import { formatTimeRange } from "./DayHourSelector";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { useParams } from "@tanstack/react-router";

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

type ValueOf<T> = T[keyof T];

const presets = [
  {
    id: "morning",
    label: "Morning",
    startTime: "08:00",
    endTime: "12:00",
  },
  {
    id: "lunch",
    label: "Lunch",
    startTime: "12:00",
    endTime: "14:00",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    startTime: "14:00",
    endTime: "18:00",
  },
  {
    id: "evening",
    label: "Evening",
    startTime: "18:00",
    endTime: "22:00",
  },
  { id: "custom", label: "Custom" },
];

export const ReservationFormContainer = () => {
  const { poolId } = useParams({ from: "/reserve/$poolId" });
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { data: poolDetails, isLoading: isLoadingPoolDetails } = usePool({
    poolId,
  });

  const { data: existingReservations = [] } = useReservations({
    poolId,
  });

  // Initialize form with today's date and default times
  const today = new Date();
  const [reservationFormState, setReservationFormState] =
    useState<ReservationForm>({
      date: format(today, "yyyy-MM-dd"),
      startTime: "08:00",
      endTime: "12:00",
      guestCount: 1,
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
      const parsed = ReservationFormSchema.parse(reservationFormState);
      createReservation({
        form: parsed,
        poolId,
        userId: "ec7a91a2-bf9b-4c49-a7a1-abcdef123456", // TODO: Get from auth context
      });
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

  // Convert existing reservations to local time for comparison
  const reservationsForSelectedDate = useMemo(() => {
    return existingReservations
      .map((reservation) => {
        const startLocal = utcToLocal(reservation.startTime);
        const endLocal = utcToLocal(reservation.endTime);
        return {
          ...reservation,
          localStartDate: startLocal.date,
          localStartTime: startLocal.time,
          localEndTime: endLocal.time,
        };
      })
      .filter((reservation) => {
        return reservation.localStartDate === reservationFormState.date;
      });
  }, [existingReservations, reservationFormState.date]);

  const handleFieldChange = (
    key: keyof ReservationForm,
    value: ValueOf<ReservationForm>
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

  const handleUpdateDate = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    handleFieldChange("date", format(date, "yyyy-MM-dd"));
  };

  const handlePresetSelect = (preset: (typeof presets)[0]) => {
    setSelectedPreset(preset.id);
    if (preset.id === "custom") {
      // Keep current times for custom
      return;
    } else if (preset.startTime && preset.endTime) {
      handleFieldChange("startTime", preset.startTime);
      handleFieldChange("endTime", preset.endTime);
    }
  };

  const reservationForm = (
    <>
      <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-800 p-6">
        <h4 className="text-xl font-semibold leading-none">
          Reserve {isLoadingPoolDetails ? "Loading..." : poolDetails?.name}
        </h4>
        <p className="text-sm text-gray-500 leading-none">
          {isLoadingPoolDetails ? "Loading..." : poolDetails?.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-start p-6">
        {/* Left column */}
        <div className="w-full md:w-[300px]">
          <Calendar
            value={new Date(reservationFormState.date + "T12:00:00")}
            onChange={handleUpdateDate}
            existingReservations={existingReservations}
          />
        </div>
        {/* Right column */}
        <div className="w-full md:w-[300px] flex flex-col gap-4">
          <h4 className="text-sm font-medium leading-none">
            {format(new Date(reservationFormState.date), "EEEE, MMMM d, yyyy")}
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
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="flex flex-col items-start text-sm">
                    <div className="font-medium">{preset.label}</div>
                    <div className="opacity-50">
                      {preset.startTime && preset.endTime
                        ? formatTimeRange(preset.startTime, preset.endTime)
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
                    {reservation.user?.name}
                    {reservation.guestCount - 1 > 0
                      ? ` & ${reservation.guestCount - 1} others`
                      : ""}
                  </div>
                  <div className="text-xs opacity-50">
                    {formatTimeRange(
                      reservation.localStartTime,
                      reservation.localEndTime
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {selectedPreset === "custom" && (
            <>
              <Field label="Date" errorMessage={fieldErrors.date}>
                <input
                  id={inputId}
                  type="date"
                  className="border border-gray-300 dark:border-gray-800 rounded-md p-2"
                  value={reservationFormState.date}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
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
                        handleFieldChange("startTime", e.target.value)
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
                        handleFieldChange("endTime", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </Field>
            </>
          )}
          <Field label="Number of Guests" errorMessage={fieldErrors.guestCount}>
            <div className="flex gap-2 items-center w-full">
              <button
                className="flex items-center justify-center bg-bg-surface border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-full p-2 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() =>
                  handleFieldChange(
                    "guestCount",
                    Math.max(reservationFormState.guestCount - 1, MIN_GUESTS)
                  )
                }
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                className="border border-gray-300 dark:border-gray-800 rounded-md p-2 flex-1 text-center"
                value={reservationFormState.guestCount}
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                onChange={(e) =>
                  handleFieldChange("guestCount", parseInt(e.target.value))
                }
              />
              <button
                className="flex items-center justify-center bg-bg-surface border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-full p-2 h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  handleFieldChange(
                    "guestCount",
                    Math.min(reservationFormState.guestCount + 1, MAX_GUESTS)
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
      <pre>{JSON.stringify({ formState: reservationFormState }, null, 2)}</pre>
    </div>
  );
};
