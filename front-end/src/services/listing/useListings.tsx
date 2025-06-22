import { useQuery } from "@tanstack/react-query";
import { listings } from "../../fakeData";
import { Listing } from "../../types";

export const useListings = () => {
  return useQuery<Listing[]>({
    queryKey: ["listings"],
    // Replace with actual API call
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(listings);
        }, 300);
      });
    },
  });
};
