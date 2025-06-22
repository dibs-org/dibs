/**
 * ReservationController is a REST controller that handles HTTP requests related to reservations.
 * It provides endpoints for retrieving all reservations and creating a new reservation.
 * 
 * <p>Endpoints:
 * <ul>
 *   <li>GET /api/reservations - Retrieves a list of all reservations.</li>
 *   <li>POST /api/reservations - Creates a new reservation.</li>
 * </ul>
 * 
 * <p>Cross-origin requests are allowed from any origin.
 * 
 * @author Emery
 */
// --- Reservation Controller ---
package com.pool.poolapp.controller;

import com.pool.poolapp.model.Reservation;
import com.pool.poolapp.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.UUID;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {
    private final ReservationRepository reservationRepo;

    public ReservationController(ReservationRepository reservationRepo) {
        this.reservationRepo = reservationRepo;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepo.save(reservation);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable UUID id, @RequestBody Reservation updatedReservation) {
        return reservationRepo.findById(id.getMostSignificantBits())
                .map(existing -> {
                    existing.setEmail(updatedReservation.getEmail());
                    existing.setDate(updatedReservation.getDate());
                    return reservationRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable UUID id) {
        reservationRepo.deleteById(id.getMostSignificantBits());
    }
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable UUID id) {
        return reservationRepo.findById(id.getMostSignificantBits())
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }
    @GetMapping("/email/{email}")
    public List<Reservation> getReservationsByEmail(@PathVariable String email) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getEmail().equalsIgnoreCase(email))
                .toList();
    }
    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable String userId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().toString().equals(userId))
                .toList();
    }
    @GetMapping("/pool/{poolId}")
    public List<Reservation> getReservationsByPoolId(@PathVariable UUID poolId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getPoolId().equals(poolId))
                .toList();
    }
    @GetMapping("/date/{date}")
    public List<Reservation> getReservationsByDate(@PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
    @GetMapping("/time/{time}")
    public List<Reservation> getReservationsByTime(@PathVariable String time) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getDate().toLocalTime().toString().equals(time))
                .toList();
    }
    @GetMapping("/user/{userId}/date/{date}")
    public List<Reservation> getReservationsByUserIdAndDate(@PathVariable String userId, @PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().toString().equals(userId) && 
                                       reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
    @GetMapping("/user/{userId}/time/{time}")
    public List<Reservation> getReservationsByUserIdAndTime(@PathVariable String userId, @PathVariable String time) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().toString().equals(userId) && 
                                       reservation.getDate().toLocalTime().toString().equals(time))
                .toList();
    }
    @GetMapping("/pool/{poolId}/date/{date}")
    public List<Reservation> getReservationsByPoolIdAndDate(@PathVariable Long poolId, @PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getPoolId().equals(poolId) && 
                                       reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
}
