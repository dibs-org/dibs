import { useMutation } from "@tanstack/react-query";
import { ReservationForm } from "../../types";
import { api, axiosInstance } from "../../urls";

type UpdateReservationForm = ReservationForm & {
  poolId: string;
  userId: string;
};

export const useUpdateReservation = () => {
  return useMutation({
    mutationFn: async (reservation: UpdateReservationForm) => {
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
