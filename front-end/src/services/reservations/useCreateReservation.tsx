import { useMutation } from "@tanstack/react-query";
import { ReservationForm, ReservationPostBodySchema } from "../../types";
import { transformFormToPostBody } from "./utils";
import { api, axiosInstance } from "../../urls";

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: async ({
      form,
      poolId,
      userId,
    }: {
      form: ReservationForm;
      poolId: string;
      userId: string;
    }) => {
      try {
        // Transform form data to the correct backend format
        const postBody = transformFormToPostBody({
          form,
          poolId,
          userId,
        });

        // Validate the transformed data
        const validatedPostBody = ReservationPostBodySchema.parse(postBody);

        const response = await axiosInstance.post(
          api.makeReservationsURL(),
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
