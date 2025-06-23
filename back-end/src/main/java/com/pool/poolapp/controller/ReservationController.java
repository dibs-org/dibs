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

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable UUID id) {
        return reservationRepo.findById(id).orElse(null);
    }
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable UUID id) {
        reservationRepo.deleteById(id);
    }
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable UUID id, @RequestBody Reservation reservation) {
        if (!reservationRepo.existsById(id)) {
            return null; // or throw an exception
        }
        reservation.setId(id);
        return reservationRepo.save(reservation);
    }
    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable UUID userId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().equals(userId))
                .toList();
    }
    @GetMapping("/pool/{poolId}")
    public List<Reservation> getReservationsByPoolId(@PathVariable UUID poolId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getPoolId().equals(poolId))
                .toList();
    }
    @GetMapping("/email/{email}")
    public List<Reservation> getReservationsByEmail(@PathVariable String email) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getEmail().equalsIgnoreCase(email))
                .toList();
    }
    @GetMapping("/date/{date}")
    public List<Reservation> getReservationsByDate(@PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
    @GetMapping("/start-time/{startTime}")
    public List<Reservation> getReservationsByStartTime(@PathVariable String startTime) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getStartTime().toLocalTime().toString().equals(startTime))
                .toList();
    }
    @GetMapping("/end-time/{endTime}")
    public List<Reservation> getReservationsByEndTime(@PathVariable String endTime) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getEndTime().toLocalTime().toString().equals(endTime))
                .toList();
    }
    @GetMapping("/created-at/{createdAt}")
    public List<Reservation> getReservationsByCreatedAt(@PathVariable String createdAt) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getCreatedAt().toLocalDate().toString().equals(createdAt))
                .toList();
    }
    @GetMapping("/user/{userId}/pool/{poolId}")
    public List<Reservation> getReservationsByUserIdAndPoolId(@PathVariable UUID userId, @PathVariable UUID poolId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().equals(userId) && reservation.getPoolId().equals(poolId))
                .toList();
    }
    @GetMapping("/user/{userId}/date/{date}")
    public List<Reservation> getReservationsByUserIdAndDate(@PathVariable UUID userId, @PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getUserId().equals(userId) && reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
    @GetMapping("/pool/{poolId}/date/{date}")
    public List<Reservation> getReservationsByPoolIdAndDate(@PathVariable UUID poolId, @PathVariable String date) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getPoolId().equals(poolId) && reservation.getDate().toLocalDate().toString().equals(date))
                .toList();
    }
}
