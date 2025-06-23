// --- Reservation Repository ---
package com.pool.poolapp.repository;

import com.pool.poolapp.model.Pool;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PoolRepository extends JpaRepository<Pool, UUID> {}
