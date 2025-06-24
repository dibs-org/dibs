import * as z from "zod/v4";

// Models

export const UserShape = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof UserShape>;

export const ReservationShape = z.object({
  id: z.string(),
  pool: z.string(),
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  numberOfGuests: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

export type Reservation = z.infer<typeof ReservationShape>;

export const PoolShape = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  owner: z.string(),
});

export type Pool = z.infer<typeof PoolShape>;

// Forms

export const ReservationFormShape = z.object({
  startTime: z.string().min(1, { message: "You must enter a start time" }),
  endTime: z.string().min(1, { message: "You must enter an end time" }),
  guestCount: z.number(),
});

export type ReservationForm = z.infer<typeof ReservationFormShape>;

export const PoolFormShape = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
});

export type PoolForm = z.infer<typeof PoolFormShape>;
