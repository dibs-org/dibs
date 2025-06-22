import { useMutation } from "@tanstack/react-query";
import { Reservation, ReservationRequestForm } from "../../types";

export const useCreateReservation = () => {
  return useMutation({
    // Replace with actual API call
    mutationFn: (reservation: ReservationRequestForm) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: "1",
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            numberOfGuests: reservation.numberOfGuests,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: "pending",
          } as Reservation);
        }, 300);
      });
    },
  });
};
