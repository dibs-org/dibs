package com.pool.poolapp.repository;

import com.pool.poolapp.model.Timeslot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;  

public interface TimeslotRepository extends JpaRepository<Timeslot, Long> {
    List<Timeslot> findAllById(Long id);
}