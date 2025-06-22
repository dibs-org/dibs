// --- Slot Controller ---
package com.pool.poolapp.controller;

import com.pool.poolapp.model.Slot;
import com.pool.poolapp.repository.SlotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "*")
public class SlotController {
    private final SlotRepository slotRepo;

    public SlotController(SlotRepository slotRepo) {
        this.slotRepo = slotRepo;
    }

    @GetMapping
    public List<Slot> getAllSlots() {
        return slotRepo.findAll();
    }

    @PostMapping
    public Slot createSlot(@RequestBody Slot slot) {
        return slotRepo.save(slot);
    }
}