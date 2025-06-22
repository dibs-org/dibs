import * as z from "zod/v4";

export const ReservationFormDataShape = z.object({
  date: z.string().min(1, { message: "You must enter a date" }),
  startTime: z.string().min(1, { message: "You must enter a start time" }),
  endTime: z.string().min(1, { message: "You must enter an end time" }),
  numberOfGuests: z.number(),
});

export type ReservationFormData = z.infer<typeof ReservationFormDataShape>;

export const ReservationShape = z.object({
  id: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  numberOfGuests: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export type Reservation = z.infer<typeof ReservationShape>;
