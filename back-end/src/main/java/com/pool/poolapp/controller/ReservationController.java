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

import com.pool.poolapp.dto.CreateReservationRequest;
import com.pool.poolapp.model.Pool;
import com.pool.poolapp.model.Reservation;
import com.pool.poolapp.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;
import com.pool.poolapp.repository.PoolRepository;
import com.pool.poolapp.model.User;
import com.pool.poolapp.repository.UserRepository;

import java.util.UUID;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final PoolRepository poolRepo;
    private final UserRepository userRepo;
    private final ReservationRepository reservationRepo;

    public ReservationController(PoolRepository poolRepo, UserRepository userRepo, ReservationRepository reservationRepo) {
        this.poolRepo = poolRepo;
        this.userRepo = userRepo;
        this.reservationRepo = reservationRepo;
    }
   @PostMapping
    public Reservation createReservation(@RequestBody CreateReservationRequest request) {
        
        Pool pool = poolRepo.findById(request.poolId())
            .orElseThrow(() -> new RuntimeException("Pool not found"));

        User user = userRepo.findById(request.userId())
            .orElse(null); // optional user

        Reservation reservation = new Reservation();
        reservation.setPool(pool);
        reservation.setUser(user);
        reservation.setEmail(request.email());
        reservation.setStartTime(request.startTime());
        reservation.setEndTime(request.endTime());

        return reservationRepo.save(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
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
    
    @GetMapping("/pool/{poolId}")
    public List<Reservation> getReservationsByPoolId(@PathVariable UUID poolId) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getPool().getId().equals(poolId))
                .toList();
    }
    @GetMapping("/email/{email}")
    public List<Reservation> getReservationsByEmail(@PathVariable String email) {
        return reservationRepo.findAll().stream()
                .filter(reservation -> reservation.getEmail().equalsIgnoreCase(email))
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
   


    @PostMapping("/batch")
    public List<Reservation> addMultipleReservations(@RequestBody List<Reservation> res) {
        return reservationRepo.saveAll(res);
    }
}
