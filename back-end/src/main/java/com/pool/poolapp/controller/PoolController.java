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
import com.pool.poolapp.security.JwtUtil;

import io.jsonwebtoken.Claims;

import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import java.util.List;

@RestController
@RequestMapping("/api/pools")
@CrossOrigin(origins = "*")
public class PoolController {

    private final PoolRepository poolRepo;
    private final JwtUtil jwtUtil;


    public PoolController(PoolRepository poolRepo, JwtUtil jwtUtil) {
        this.poolRepo = poolRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/batch")
    public List<Pool> addMultiplePools(@RequestBody List<Pool> pools) {
        // log the number of pools being added
        System.out.println("Adding " + pools.size() + " pools");
        return poolRepo.saveAll(pools);
    }

    @GetMapping
    public List<Pool> getAllPools() {
        // log the retrieval of all pools
        System.out.println("Retrieving all pools");
        return poolRepo.findAll();
    }

    @GetMapping("/myPools")
    public List<Pool> getMyPools(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String userId = getUserIdFromToken(token);

        return poolRepo.findAll().stream()
                .filter(pool -> pool.getOwner() != null && pool.getOwner().toString().equals(userId))
                .toList();
    }

    private String getUserIdFromToken(String token) {
        Claims claims = jwtUtil.validateToken(token);
        return claims.getSubject(); // Supabase puts the user ID in "sub"
    }

    @PostMapping
    public Pool createPool(@RequestBody Pool pool) {
        System.out.println("Creating pool: " + pool);
        return poolRepo.save(pool);
    }
    @GetMapping("/{id}")
    public Pool getPoolById(@PathVariable String id) {
        return poolRepo.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Pool not found with id " + id));
    }
    @PutMapping("/{id}")
    public Pool updatePool(@PathVariable String id, @RequestBody Pool updatedPool) {
        return poolRepo.findById(UUID.fromString(id))
                .map(existing -> {
                    existing.setName(updatedPool.getName());
                    existing.setAddress(updatedPool.getAddress());
                    return poolRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Pool not found with id " + id));
    }
    @DeleteMapping("/{id}")
    public void deletePool(@PathVariable String id) {
        poolRepo.deleteById(UUID.fromString(id));
    }
    @GetMapping("/name/{name}")
    public List<Pool> getPoolsByName(@PathVariable String name) {
        return poolRepo.findAll().stream()
                .filter(pool -> pool.getName().equalsIgnoreCase(name))
                .toList();
    }
    @GetMapping("/location/{location}")
    public List<Pool> getPoolsByLocation(@PathVariable String location) {
        return poolRepo.findAll().stream()
                .filter(pool -> pool.getAddress().equalsIgnoreCase(location))
                .toList();
    }
    @GetMapping("/active")
    public List<Pool> getActivePools() {
        return poolRepo.findAll().stream()
                .filter(Pool::getIsActive)
                .toList();
    }
    @GetMapping("/inactive")
    public List<Pool> getInactivePools() {
        return poolRepo.findAll().stream()
                .filter(pool -> !pool.getIsActive())
                .toList();
    }
    @GetMapping("/owner/{ownerId}")
    public List<Pool> getPoolsByOwnerId(@PathVariable String ownerId) {
        return poolRepo.findAll().stream()
                .filter(pool -> pool.getOwner().toString().equals(ownerId))
                .toList();
    }
    @GetMapping("/created-at/{date}")
    public List<Pool> getPoolsByCreatedAt(@PathVariable String date) {
        return poolRepo.findAll().stream()
                .filter(pool -> pool.getCreatedAt().toLocalDate().toString().equals(date))
                .toList();
    }
    @GetMapping("/description/{description}")
    public List<Pool> getPoolsByDescription(@PathVariable String description) {
        return poolRepo.findAll().stream()
                .filter(pool -> pool.getDescription() != null && pool.getDescription().contains(description))
                .toList();
    }
    @GetMapping("/count")
    public long countPools() {
        return poolRepo.count();
    }
    @GetMapping("/exists/{id}")
    public boolean poolExists(@PathVariable String id) {
        return poolRepo.existsById(UUID.fromString(id));
    }
    @GetMapping("/exists/name/{name}")
    public boolean poolExistsByName(@PathVariable String name) {
        return poolRepo.findAll().stream()
                .anyMatch(pool -> pool.getName().equalsIgnoreCase(name));
    }
}
