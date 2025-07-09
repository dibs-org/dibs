import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";

const makeMyReservationsKey = () => ["my-reservations"];

type ReservationWithPool = Omit<Reservation, "pool"> & {
  pool: Omit<Pool, "owner"> & { owner: User };
};

export const useMyReservations = () => {
  return useQuery<ReservationWithPool[]>({
    queryKey: makeMyReservationsKey(),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          api.makeReservationsForUserURL()
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
