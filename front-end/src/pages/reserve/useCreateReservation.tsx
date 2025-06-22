import { useMutation } from "@tanstack/react-query";
import { Reservation, ReservationFormData } from "./types";

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (reservation: ReservationFormData) => {
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
        }, 1000);
      });
    },
  });
};
