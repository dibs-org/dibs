import { Listing, Reservation } from "./types";

export const users = [
  {
    id: "1",
    name: "David",
    email: "dbernisitalian@gmail.com",
  },
  {
    id: "2",
    name: "Sam",
    email: "sdbernhardt@gmail.com",
  },
  {
    id: "3",
    name: "Xander",
    email: "xanderbernhardt@gmail.com",
  },
];

export const reservations: Reservation[] = [
  {
    id: "1",
    listingId: "1",
    userId: "3",
    date: "2025-06-24",
    startTime: "10:00",
    endTime: "12:00",
    numberOfGuests: 1,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "pending",
  },
];

export const listings: Listing[] = [
  {
    id: "1",
    name: "David & Barb's Pool",
    address: {
      street: "320 Silverwood Dr",
      city: "Manheim",
      state: "PA",
      zipCode: "17545",
    },
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    ownerId: "1",
  },
];
