import { useQuery } from "@tanstack/react-query";
import { Pool } from "../../types";
import { api, axiosInstance } from "../../urls";

export const makePoolsKey = () => ["pools"];

export const usePools = () => {
  return useQuery<Pool[]>({
    queryKey: makePoolsKey(),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(api.makePoolsURL());
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};
