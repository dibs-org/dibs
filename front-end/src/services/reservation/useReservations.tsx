import { useQuery } from "@tanstack/react-query";
import { listings, reservations, users } from "../../fakeData";
import { Listing, Reservation, User } from "../../types";

export type ReservationWithListingAndHostUserAndRenterUser = Reservation & {
  listing?: Listing;
  hostUser?: User;
  renterUser?: User;
};

export const useReservations = (args?: { listingId?: string }) => {
  const { listingId } = args || {};

  return useQuery<ReservationWithListingAndHostUserAndRenterUser[]>({
    queryKey: ["reservations", listingId],
    // Replace with actual API call
    queryFn: () => {
      return new Promise((resolve) => {
        const filteredReservations = reservations
          .filter((reservation) =>
            listingId ? reservation.listingId === listingId : true
          )
          .map((reservation) => {
            const listing = listings.find(
              (listing) => listing.id === reservation.listingId
            );
            const hostUser = users.find((user) => user.id === listing?.ownerId);
            const renterUser = users.find(
              (user) => user.id === reservation.userId
            );
            return {
              ...reservation,
              listing,
              hostUser,
              renterUser,
            };
          });
        setTimeout(() => {
          resolve(filteredReservations);
        }, 300);
      });
    },
  });
};
