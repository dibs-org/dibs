import axios from "axios";
import { supabase } from "./services/supabase";

const BASE_API_URL =
  import.meta.env.VITE_API_URL || "https://dibs-production.up.railway.app/api";
console.log("Using API URL:", BASE_API_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const session = await supabase.auth.getSession();
    const token = session?.data?.session?.access_token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const api = {
  // Pools
  makePoolURL: (id: string) => `/pools/${id}`,
  makePoolsURL: () => `/pools`,
  // Reservations
  makeReservationURL: (id: string) => `/reservations/${id}`,
  makeReservationsURL: () => `/reservations`,
  makeReservationsForUserURL: () => `/reservations/myReservations`,
};
