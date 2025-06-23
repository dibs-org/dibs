import "react-day-picker/style.css";
import { useState, useId } from "react";
import { useCreateReservation } from "../../services/reservation/useCreateReservation";
import { ReservationRequestFormShape } from "../../types";
import z from "zod/v4";
import Field from "../../components/Field";
import { format, isValid, parse } from "date-fns";
import { useListingDetails } from "../../services/listing/useListing";
import { Calendar } from "./Calendar";
import { useReservations } from "../../services/reservation/useReservations";
import DayHourSelector, { formatTimeRange } from "./DayHourSelector";

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

type ReservationFormState = {
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  numberOfGuests: number;
};

type ValueOf<T> = T[keyof T];

export const ReservationForm = ({ listingId }: { listingId: string }) => {
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
      date: new Date().toISOString().split("T")[0],
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
    const parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());

    if (isValid(parsedDate)) {
      handleDateChange("date", e.target.value);
    } else {
      handleDateChange("date", undefined);
    }
  };

  const reservationForm = (
    <>
      <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h3 className="text-sm text-gray-500">Reserve</h3>
        <h4 className="text-lg font-medium leading-none">
          {isLoadingListingDetails ? "Loading..." : listingDetails?.name}
        </h4>
        <p className="text-sm text-gray-500">
          {isLoadingListingDetails ? "Loading..." : listingDetails?.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="w-full md:w-[300px]">
          <Calendar
            value={reservationFormState.date}
            onChange={(date) => handleDateChange("date", date)}
            existingReservations={existingReservations}
          />
        </div>
        <div className="w-full md:w-[300px] flex flex-col gap-4">
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {false &&
            existingReservations
              .filter(
                (reservation) => reservation.date === reservationFormState.date
              )
              .map((reservation) => (
                <div key={reservation.id}>
                  <h3 className="text-sm text-gray-500">
                    {new Date(reservation.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {reservation.startTime} - {reservation.endTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    {reservation.renterUser?.name}
                    {reservation.numberOfGuests - 1 > 0
                      ? ` + ${reservation.numberOfGuests - 1} others`
                      : ""}
                  </p>
                </div>
              ))}
          {reservationFormState.date
            ? format(new Date(reservationFormState.date), "EEEE, MMMM d, yyyy")
            : null}
          <DayHourSelector
            events={existingReservations.filter(
              (reservation) => reservation.date === reservationFormState.date
            )}
            renderEvent={(reservation) => (
              <div className="w-full flex flex-col justify-between gap-2 h-full bg-blue-200/80 dark:bg-blue-800/50 border border-blue-500/10 rounded-lg p-2">
                <div className="flex flex-col">
                  <div className="text-sm leading-none">
                    {reservation.renterUser?.name}
                    {reservation.numberOfGuests - 1 > 0
                      ? ` + ${reservation.numberOfGuests - 1} others`
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
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {true && (
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
                className="bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-md p-2 w-10"
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
                className="border border-gray-300 dark:border-gray-800 rounded-md p-2 flex-1 text-center"
                value={reservationFormState.numberOfGuests}
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                onChange={(e) =>
                  handleDateChange("numberOfGuests", parseInt(e.target.value))
                }
              />
              <button
                className="bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-md p-2 w-10"
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
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-md p-2"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Requesting..." : "Request"}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-surface dark:bg-gray-900">
      {isSuccess ? (
        <div>
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
