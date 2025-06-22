import { useMutation } from "@tanstack/react-query";
import { Listing, ListingForm } from "../../types";

export const useCreateListing = () => {
  return useMutation({
    // Replace with actual API call
    mutationFn: (listing: ListingForm) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const listingDetails: Listing = {
            id: "1",
            name: listing.name,
            address: listing.address,
            ownerId: "1",
            description: listing.description,
            amenities: listing.amenities,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          resolve(listingDetails);
        }, 300);
      });
    },
  });
};
