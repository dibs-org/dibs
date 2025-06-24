import { useMutation } from "@tanstack/react-query";
import { PoolForm } from "../../types";
import { api, axiosInstance } from "../../urls";

export const useCreatePool = () => {
  return useMutation({
    mutationFn: async (pool: PoolForm) => {
      try {
        const response = await axiosInstance.post(api.makePoolsURL(), pool);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
