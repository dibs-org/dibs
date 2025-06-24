import { useMutation } from "@tanstack/react-query";
import { ReservationForm } from "../../types";
import { api, axiosInstance } from "../../urls";

type CreateReservationForm = ReservationForm & {
  poolId: string;
  userId: string;
};

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: async (reservation: CreateReservationForm) => {
      try {
        const response = await axiosInstance.post(
          api.makeReservationsURL(),
          reservation
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
