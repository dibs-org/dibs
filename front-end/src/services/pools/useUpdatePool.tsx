import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PoolForm } from "../../types";
import { makePoolKey } from "./usePool";
import { makePoolsKey } from "./usePools";
import { api, axiosInstance } from "../../urls";

export const useUpdatePool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      poolId,
      pool,
    }: {
      poolId: string;
      pool: PoolForm;
    }) => {
      try {
        const response = await axiosInstance.put(api.makePoolURL(poolId), pool);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: makePoolKey(data.id),
      });
      queryClient.invalidateQueries({ queryKey: makePoolsKey() });
    },
  });
};
