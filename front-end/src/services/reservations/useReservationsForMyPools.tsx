import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";
import { useAuth } from "../../AuthProvider";

export const makeReservationsKey = (poolId?: string, userId?: string) => [
  "reservations-for-my-pools",
  poolId,
  userId,
];

export type ReservationWithPoolAndUser = Reservation & {
  pool?: Pool & {
    owner?: User;
  };
  user?: User;
};

export const useReservationsForMyPools = (args?: { poolId?: string }) => {
  const { user } = useAuth();
  const { poolId } = args || {};

  return useQuery<ReservationWithPoolAndUser[]>({
    queryKey: makeReservationsKey(poolId, user?.id),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makeReservationsURL());
        const data = response.data;

        // TODO: Consider filtering on the server side
        return data.filter((reservation: ReservationWithPoolAndUser) => {
          if (poolId) {
            return (
              reservation.pool?.id === poolId &&
              reservation.pool?.owner.id === user?.id
            );
          }
          return reservation.pool?.owner.id === user?.id;
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!user?.id,
  });
};
