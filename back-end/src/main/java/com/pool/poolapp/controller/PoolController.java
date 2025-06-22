/**
 * Controller class for managing pool-related operations.
 * Provides endpoints for retrieving and creating pool entities.
 * 
 * <p>This class is annotated with {@link RestController} to define it as a RESTful web service,
 * {@link RequestMapping} to specify the base URL for all endpoints, and {@link CrossOrigin} to
 * allow cross-origin requests.</p>
 * 
 * <p>Endpoints:</p>
 * <ul>
 *   <li><b>GET /api/pools</b>: Retrieves a list of all pools.</li>
 *   <li><b>POST /api/pools</b>: Creates a new pool entity.</li>
 * </ul>
 * 
 * <p>Dependencies:</p>
 * <ul>
 *   <li>{@link PoolRepository}: Repository interface for accessing pool data.</li>
 * </ul>
 * 
 * <p>Example usage:</p>
 * <pre>
 * {@code
 * // GET request to retrieve all pools
 * fetch('/api/pools')
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 * 
 * // POST request to create a new pool
 * fetch('/api/pools', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'New Pool', location: 'City Center' })
 * })
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 * }
 * </pre>
 */
package com.pool.poolapp.controller;

import com.pool.poolapp.model.Pool;
import com.pool.poolapp.repository.PoolRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pools")
@CrossOrigin(origins = "*")
public class PoolController {

    private final PoolRepository poolRepo;

    public PoolController(PoolRepository poolRepo) {
        this.poolRepo = poolRepo;
    }

    @GetMapping
    public List<Pool> getAllPools() {
        return poolRepo.findAll();
    }

    @PostMapping
    public Pool createPool(@RequestBody Pool pool) {
        System.out.println("Creating pool: " + pool);
        return poolRepo.save(pool);
    }
}
