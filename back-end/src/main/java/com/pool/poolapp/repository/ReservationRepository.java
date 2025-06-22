// --- Reservation Repository ---
package com.pool.poolapp.repository;

import com.pool.poolapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {}
