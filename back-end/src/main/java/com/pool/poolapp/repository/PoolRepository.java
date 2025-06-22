// --- Reservation Repository ---
package com.pool.poolapp.repository;

import com.pool.poolapp.model.Pool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolRepository extends JpaRepository<Pool, Long> {}
