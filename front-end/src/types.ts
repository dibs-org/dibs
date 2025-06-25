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

// ✅ 1. Reservation Schema (Full Object From Backend)
export const ReservationSchema = z.object({
  id: z.string(),
  pool: z.string(),
  userId: z.string(),
  startTime: z.string().datetime(), // UTC ISO string
  endTime: z.string().datetime(), // UTC ISO string
  guestCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  user: UserShape.optional(), // Optional populated user data
});

export type Reservation = z.infer<typeof ReservationSchema>;

// ✅ 2. ReservationFormSchema (Form Input Shape)
export const ReservationFormSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"), // 'YYYY-MM-DD'
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:mm format"), // 'HH:mm'
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "End time must be in HH:mm format"), // 'HH:mm'
  guestCount: z.number().min(1).max(50),
});

export type ReservationForm = z.infer<typeof ReservationFormSchema>;

// ✅ 3. ReservationPostBodySchema (What You Send to Backend)
export const ReservationPostBodySchema = z.object({
  poolId: z.string(),
  userId: z.string(),
  startTime: z.string().datetime(), // UTC ISO
  endTime: z.string().datetime(), // UTC ISO
  guestCount: z.number(),
});

export type ReservationPostBody = z.infer<typeof ReservationPostBodySchema>;

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

export const PoolFormShape = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
});

export type PoolForm = z.infer<typeof PoolFormShape>;
