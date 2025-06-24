import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";

export const makeReservationsKey = (poolId?: string) => [
  "reservations",
  poolId,
];

export type ReservationWithPoolAndUser = Reservation & {
  pool?: Pool & {
    owner?: User;
  };
  user?: User;
};

export const useReservations = (args?: { poolId?: string }) => {
  const { poolId } = args || {};

  return useQuery<ReservationWithPoolAndUser[]>({
    queryKey: makeReservationsKey(poolId),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makeReservationsURL());
        const data = response.data;

        // TODO: Consider filtering on the server side
        return data.filter((reservation: ReservationWithPoolAndUser) => {
          if (poolId) {
            return reservation.pool?.id === poolId;
          }
          return true;
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
