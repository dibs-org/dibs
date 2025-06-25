import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { Reservation, ReservationForm, ReservationPostBody } from "../../types";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Combines a date string (YYYY-MM-DD) with a time string (HH:mm) to create a local datetime string
 */
export function combineDateAndTime(date: string, time: string): string {
  return `${date}T${time}:00`;
}

/**
 * Converts a local datetime string to UTC ISO string
 */
export function localToUtc(localDateTime: string): string {
  return fromZonedTime(localDateTime, timeZone).toISOString();
}

/**
 * Converts a UTC ISO string to local datetime components
 */
export function utcToLocal(utcIsoString: string): {
  date: string;
  time: string;
} {
  const localDate = toZonedTime(new Date(utcIsoString), timeZone);
  return {
    date: format(localDate, "yyyy-MM-dd"),
    time: format(localDate, "HH:mm"),
  };
}

/**
 * Transforms form state to post body with UTC conversion
 */
export function transformFormToPostBody({
  form,
  poolId,
  userId,
}: {
  form: ReservationForm;
  poolId: string;
  userId: string;
}): ReservationPostBody {
  const startLocal = combineDateAndTime(form.date, form.startTime);
  const endLocal = combineDateAndTime(form.date, form.endTime);

  return {
    poolId,
    userId,
    startTime: localToUtc(startLocal),
    endTime: localToUtc(endLocal),
    guestCount: form.guestCount,
  };
}

/**
 * Transforms backend reservation to form state with local conversion
 */
export function transformReservationToForm(
  reservation: Reservation
): ReservationForm {
  const startLocal = utcToLocal(reservation.startTime);
  const endLocal = utcToLocal(reservation.endTime);

  return {
    date: startLocal.date,
    startTime: startLocal.time,
    endTime: endLocal.time,
    guestCount: reservation.guestCount,
  };
}
