import { useQuery } from "@tanstack/react-query";
import { listings } from "../../fakeData";
import { Listing } from "../../types";

export const useListingDetails = ({ listingId }: { listingId: string }) => {
  return useQuery<Listing>({
    queryKey: ["listingDetails", listingId],
    // Replace with actual API call
    queryFn: () => {
      const listing = listings.find((listing) => listing.id === listingId);
      if (!listing) {
        throw new Error("Listing not found");
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(listing);
        }, 300);
      });
    },
  });
};
