package com.pool.poolapp.controller;


import com.pool.poolapp.model.Timeslot;
import com.pool.poolapp.repository.TimeslotRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class TimeslotController {
    private final TimeslotRepository timeslotRepo;

    public TimeslotController(TimeslotRepository timeslotRepo) {
        this.timeslotRepo = timeslotRepo;
    }

    @GetMapping
    public List<Timeslot> getAllTimeslots() {
        return timeslotRepo.findAll();
    }

    @PostMapping
    public Timeslot createTimeslot(@RequestBody Timeslot timeslot) {
        return timeslotRepo.save(timeslot);
    }

   
}
