package com.pool.poolapp.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pool.poolapp.model.PoolTimeslot;

public interface PoolTimeslotRepository extends JpaRepository<PoolTimeslot, Long> {
    List<PoolTimeslot> findByPoolIdAndDate(UUID poolId, LocalDate date);
    void deleteByPoolIdAndDate(UUID poolId, LocalDate date);
}