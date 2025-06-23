import { Listing, Reservation } from "./types";

export const users = [
  {
    id: "1",
    name: "David",
    email: "dbernisitalian@gmail.com",
    phone: "(717) 917-5881",
  },
  {
    id: "2",
    name: "Sam",
    email: "sdbernhardt@gmail.com",
    phone: "(717) 917-5881",
  },
  {
    id: "3",
    name: "Xander",
    email: "xanderbernhardt@gmail.com",
    phone: "(717) 917-5881",
  },
  {
    id: "4",
    name: "Rick",
    email: "rickbernhardt@gmail.com",
    phone: "(717) 917-5881",
  },
];

export const reservations: Reservation[] = [
  {
    id: "1",
    listingId: "1",
    userId: "3",
    date: "2025-06-26",
    startTime: "08:00",
    endTime: "12:30",
    numberOfGuests: 3,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "pending",
  },
  {
    id: "2",
    listingId: "1",
    userId: "2",
    date: "2025-06-24",
    startTime: "17:00",
    endTime: "19:00",
    numberOfGuests: 1,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "confirmed",
  },
  {
    id: "2",
    listingId: "1",
    userId: "4",
    date: "2025-06-27",
    startTime: "18:00",
    endTime: "22:00",
    numberOfGuests: 7,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "confirmed",
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
    description: "A beautiful pool in the backyard of a beautiful home",
    amenities: ["pool", "hot tub", "fire pit", "outdoor kitchen"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    ownerId: "1",
  },
];
