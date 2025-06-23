import { useQuery } from "@tanstack/react-query";
import { listings, reservations } from "../../fakeData";
import { Listing, Reservation } from "../../types";

export const useMyReservations = (args?: { userId?: string }) => {
  const { userId } = args || {};

  return useQuery<(Reservation & { listing?: Listing })[]>({
    queryKey: ["my-reservations", userId],
    // Replace with actual API call
    queryFn: () => {
      return new Promise((resolve) => {
        const filteredReservations = reservations
          .filter((reservation) =>
            userId ? reservation.userId === userId : true
          )
          .map((reservation) => {
            const listing = listings.find(
              (listing) => listing.id === reservation.listingId
            );
            return {
              ...reservation,
              listing,
            };
          });
        setTimeout(() => {
          resolve(filteredReservations);
        }, 300);
      });
    },
  });
};
