import axios from "axios";

const BASE_API_URL = "https://dibs-production.up.railway.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

export const api = {
  // Pools
  makePoolURL: (id: string) => `/pools/${id}`,
  makePoolsURL: () => `/pools`,
  // Reservations
  makeReservationURL: (id: string) => `/reservations/${id}`,
  makeReservationsURL: () => `/reservations`,
  makeReservationsForUserURL: (userId?: string) =>
    `/reservations/user/${userId}`,
};
