import { useQuery } from "@tanstack/react-query";
import { listings, reservations, users } from "../../fakeData";
import { Listing, Reservation, User } from "../../types";

export const useReservation = ({ id }: { id: string }) => {
  return useQuery<Reservation & { listing?: Listing; hostUser?: User }>({
    queryKey: ["reservation", id],
    // Replace with actual API call
    queryFn: () => {
      const reservation = reservations.find(
        (reservation) => reservation.id === id
      );
      const listing = listings.find(
        (listing) => listing.id === reservation?.listingId
      );
      const hostUser = users.find((user) => user.id === listing?.ownerId);
      if (!reservation) {
        throw new Error("Reservation not found");
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...reservation,
            listing,
            hostUser,
          });
        }, 300);
      });
    },
  });
};
