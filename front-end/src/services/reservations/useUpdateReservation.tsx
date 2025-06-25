import { useMutation } from "@tanstack/react-query";
import {
  ReservationForm,
  ReservationPostBodySchema,
  transformFormToPostBody,
} from "../../types";
import { api, axiosInstance } from "../../urls";

type UpdateReservationForm = ReservationForm & {
  userId: string;
  reservationId: string; // Need the ID for updates
};

export const useUpdateReservation = () => {
  return useMutation({
    mutationFn: async (reservationForm: UpdateReservationForm) => {
      try {
        // Transform form data to the correct backend format
        const postBody = transformFormToPostBody(reservationForm);

        // Validate the transformed data
        const validatedPostBody = ReservationPostBodySchema.parse(postBody);

        const response = await axiosInstance.put(
          `${api.makeReservationsURL()}/${reservationForm.reservationId}`,
          validatedPostBody
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
