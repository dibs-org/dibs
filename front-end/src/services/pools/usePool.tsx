import { useQuery } from "@tanstack/react-query";
import { Pool } from "../../types";
import { api, axiosInstance } from "../../urls";

export const makePoolKey = (poolId?: string) => ["pool", poolId];

export const usePool = ({ poolId }: { poolId?: string }) => {
  return useQuery<Pool>({
    queryKey: makePoolKey(poolId),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makePoolURL(poolId!));
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!poolId,
  });
};
