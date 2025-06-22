import { useQuery } from "@tanstack/react-query";
import { reservations } from "../../fakeData";
import { Reservation } from "../../types";

export const useReservations = ({ listingId }: { listingId: string }) => {
  return useQuery<Reservation[]>({
    queryKey: ["reservations", listingId],
    // Replace with actual API call
    queryFn: () => {
      return new Promise((resolve) => {
        const filteredReservations = reservations.filter(
          (reservation) => reservation.listingId === listingId
        );
        setTimeout(() => {
          resolve(filteredReservations);
        }, 300);
      });
    },
  });
};
