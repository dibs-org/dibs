import { useQuery } from "@tanstack/react-query";
import { Pool } from "../../types";
import { api, axiosInstance } from "../../urls";
import { useAuth } from "../../AuthProvider";

export const makeMyPoolsKey = () => ["my-pools"];

export const useMyPools = () => {
  const { user } = useAuth();
  return useQuery<Pool[]>({
    queryKey: makeMyPoolsKey(),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makePoolsURL());
        const pools = response.data;
        const myPools = pools.filter(
          (pool: Pool) => pool.owner.id === user?.id
        );
        return myPools;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
