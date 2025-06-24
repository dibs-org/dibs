package com.pool.poolapp.repository;

import com.pool.poolapp.model.PoolDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

import java.util.Optional;

public interface PoolDetailsRepository extends JpaRepository<PoolDetails, Long> {
    Optional<PoolDetails> findByPoolId(UUID poolId);
}
