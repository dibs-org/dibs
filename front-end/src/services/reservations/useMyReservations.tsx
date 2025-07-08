import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";
import { useAuth } from "../../AuthProvider";

const makeMyReservationsKey = (userId?: string) => ["my-reservations", userId];

type ReservationWithPool = Omit<Reservation, "pool"> & {
  pool: Omit<Pool, "owner"> & { owner: User };
};

export const useMyReservations = () => {
  const { user } = useAuth();

  return useQuery<ReservationWithPool[]>({
    queryKey: makeMyReservationsKey(user?.id),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          api.makeReservationsForUserURL(user?.id)
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!user?.id,
  });
};
