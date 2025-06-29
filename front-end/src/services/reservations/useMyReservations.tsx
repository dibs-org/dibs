import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";

const makeMyReservationsKey = (userId?: string) => ["my-reservations", userId];

type ReservationWithPool = Omit<Reservation, "pool"> & {
  pool: Omit<Pool, "owner"> & { owner: User };
};

export const useMyReservations = (args?: { userId?: string }) => {
  const { userId } = args || {};

  return useQuery<ReservationWithPool[]>({
    queryKey: makeMyReservationsKey(userId),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          api.makeReservationsForUserURL(userId)
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
