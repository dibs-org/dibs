package com.pool.poolapp.controller;

import com.pool.poolapp.model.Pool;
import com.pool.poolapp.model.PoolDetails;
import com.pool.poolapp.repository.PoolDetailsRepository;
import com.pool.poolapp.repository.PoolRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pool-details")
@CrossOrigin(origins = "*")
public class PoolDetailsController {

    private final PoolDetailsRepository poolDetailsRepo;
    private final PoolRepository poolRepo;

    public PoolDetailsController(PoolDetailsRepository poolDetailsRepo, PoolRepository poolRepo) {
        this.poolDetailsRepo = poolDetailsRepo;
        this.poolRepo = poolRepo;
    }

    @GetMapping
    public List<PoolDetails> getAllDetails() {
        return poolDetailsRepo.findAll();
    }

    @PostMapping
    public PoolDetails createDetails(@RequestBody PoolDetails details) {
        // Ensure the pool exists
        Pool pool = poolRepo.findById(details.getPool().getId())
            .orElseThrow(() -> new RuntimeException("Pool not found"));
        details.setPool(pool);
        return poolDetailsRepo.save(details);
    }

    @GetMapping("/pool/{poolId}")
    public PoolDetails getByPool(@PathVariable UUID poolId) {
        return poolDetailsRepo.findByPoolId(poolId)
            .orElseThrow(() -> new RuntimeException("Details not found for pool"));
    }
}
