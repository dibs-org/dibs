import { useQuery } from "@tanstack/react-query";
import { reservations } from "../../fakeData";
import { Reservation } from "../../types";

export const useReservation = ({ id }: { id: string }) => {
  return useQuery<Reservation>({
    queryKey: ["reservation", id],
    // Replace with actual API call
    queryFn: () => {
      const reservation = reservations.find(
        (reservation) => reservation.id === id
      );
      if (!reservation) {
        throw new Error("Reservation not found");
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(reservation);
        }, 300);
      });
    },
  });
};
