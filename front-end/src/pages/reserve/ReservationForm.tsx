import "react-day-picker/style.css";
import { useState, useId } from "react";
import { useCreateReservation } from "../../services/reservation/useCreateReservation";
import { ReservationRequestFormShape } from "../../types";
import z from "zod/v4";
import Field from "../../components/Field";
import { isValid, parse } from "date-fns";
import { useListingDetails } from "../../services/listing/useListing";
import { Calendar } from "./Calendar";

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

  if (isLoadingListingDetails) {
    return (
      <div>
        <h3 className="text-2xl font-bold">Reserve</h3>
        <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
      </div>
    );
  }

  const reservationForm = (
    <>
      <h3 className="text-2xl font-bold">Reserve</h3>
      <h4 className="text-lg font-bold">{listingDetails?.name}</h4>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Calendar
          value={reservationFormState.date}
          onChange={(date) => handleDateChange("date", date)}
          listingId={listingId}
        />
        <div className="flex flex-col gap-4 w-full">
          <Field label="Date" errorMessage={fieldErrors.date}>
            <input
              id={inputId}
              type="date"
              className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2"
              value={reservationFormState.date}
              onChange={handleInputChange}
            />
          </Field>
          <Field label="Time">
            <div className="flex gap-2 items-center">
              <Field errorMessage={fieldErrors.startTime}>
                <input
                  type="time"
                  className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1"
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
                  className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1"
                  value={reservationFormState.endTime}
                  onChange={(e) => handleDateChange("endTime", e.target.value)}
                />
              </Field>
            </div>
          </Field>
          <Field
            label="Number of Guests"
            errorMessage={fieldErrors.numberOfGuests}
          >
            <div className="flex gap-2 items-center w-full">
              <button
                className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-md p-2 w-10"
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
                className="border border-neutral-300 dark:border-neutral-800 rounded-md p-2 flex-1 text-center"
                value={reservationFormState.numberOfGuests}
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                onChange={(e) =>
                  handleDateChange("numberOfGuests", parseInt(e.target.value))
                }
              />
              <button
                className="bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-md p-2 w-10"
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
      <pre>{JSON.stringify({ listingDetails }, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          {
            reservationFormState,
            parsedDate: reservationFormState.date,
          },
          null,
          2
        )}
      </pre>
    </>
  );

  return (
    <div className="flex flex-col gap-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-900">
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
