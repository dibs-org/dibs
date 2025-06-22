import * as z from "zod/v4";

export const UserShape = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserShape>;

export const ReservationRequestFormShape = z.object({
  date: z.string().min(1, { message: "You must enter a date" }),
  startTime: z.string().min(1, { message: "You must enter a start time" }),
  endTime: z.string().min(1, { message: "You must enter an end time" }),
  numberOfGuests: z.number(),
});

export type ReservationRequestForm = z.infer<
  typeof ReservationRequestFormShape
>;

export const ReservationShape = z.object({
  id: z.string(),
  listingId: z.string(),
  userId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  numberOfGuests: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export type Reservation = z.infer<typeof ReservationShape>;

export const ListingFormShape = z.object({
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  description: z.string(),
  amenities: z.array(z.string()),
});

export type ListingForm = z.infer<typeof ListingFormShape>;

export const ListingDetailsShape = z.object({
  id: z.string(),
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  description: z.string(),
  amenities: z.array(z.string()),
  ownerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Listing = z.infer<typeof ListingDetailsShape>;
