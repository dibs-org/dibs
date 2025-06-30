package com.pool.poolapp.controller;


import com.pool.poolapp.model.PoolTimeslot;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.pool.poolapp.repository.PoolTimeslotRepository;

public class PoolTimeslotController {
    private final PoolTimeslotRepository pooltimeslotRepo;

    public PoolTimeslotController(PoolTimeslotRepository pooltimeslotRepo) {
        this.pooltimeslotRepo = pooltimeslotRepo;
    }

    @GetMapping
    public List<PoolTimeslot> getAllTimeslots() {
        return pooltimeslotRepo.findAll();
    }

    @PostMapping
    public PoolTimeslot createTimeslot(@RequestBody PoolTimeslot timeslot) {
        return pooltimeslotRepo.save(timeslot);
    }

   
}
