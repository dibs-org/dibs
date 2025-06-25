import { Pool, Reservation } from "./types";

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
    pool: "1",
    userId: "3",
    startTime: "2025-06-26T08:00:00.000Z",
    endTime: "2025-06-26T12:30:00.000Z",
    guestCount: 3,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "pending",
  },
  {
    id: "2",
    pool: "1",
    userId: "2",
    startTime: "2025-06-24T17:00:00.000Z",
    endTime: "2025-06-24T19:00:00.000Z",
    guestCount: 1,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "confirmed",
  },
  {
    id: "2",
    pool: "1",
    userId: "4",
    startTime: "2025-06-27T18:00:00.000Z",
    endTime: "2025-06-27T22:00:00.000Z",
    guestCount: 7,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    status: "confirmed",
  },
];

export const pools: Pool[] = [
  {
    id: "1",
    createdAt: "2025-01-01",
    owner: "1",
    name: "",
    address: "320 Silverwood Dr, Manheim, PA 17545",
    description: "A beautiful pool in the backyard of a beautiful home",
    isActive: true,
    // amenities: ["pool", "hot tub", "fire pit", "outdoor kitchen"],
    // availability: {
    //   monday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   tuesday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   wednesday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   thursday: { available: true, startTime: "09:00", endTime: "18:00" },
    //   friday: { available: true, startTime: "09:00", endTime: "20:00" },
    //   saturday: { available: true, startTime: "08:00", endTime: "20:00" },
    //   sunday: { available: false, startTime: "09:00", endTime: "18:00" },
    // },
    // rules:
    //   "No glass containers. No diving. Children must be supervised at all times.",
    // wifiPassword: "poolparty123",
    // contactInstructions:
    //   "Text me at arrival. Parking is available in the driveway.",
    // status: "active",
  },
];
