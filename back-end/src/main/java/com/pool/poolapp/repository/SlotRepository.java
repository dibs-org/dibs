// --- Slot Repository ---
package com.pool.poolapp.repository;

import com.pool.poolapp.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepository extends JpaRepository<Slot, Long> {}