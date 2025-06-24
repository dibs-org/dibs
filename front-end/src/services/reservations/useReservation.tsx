import { useQuery } from "@tanstack/react-query";
import { Pool, Reservation, User } from "../../types";
import { api, axiosInstance } from "../../urls";

export const makeReservationKey = (id: string) => ["reservation", id];

type ReservationWithListingAndHostUser = Reservation & {
  pool?: Pool & {
    owner?: User;
  };
  user?: User;
};

export const useReservation = ({ id }: { id: string }) => {
  return useQuery<ReservationWithListingAndHostUser>({
    queryKey: makeReservationKey(id),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makeReservationURL(id));
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
