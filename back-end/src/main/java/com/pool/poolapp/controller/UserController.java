// --- User Controller ---
package com.pool.poolapp.controller;

import com.pool.poolapp.model.User;
import com.pool.poolapp.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        // Optional: avoid duplicate emails
        Optional<User> existing = userRepo.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        return userRepo.save(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepo.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }
    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepo.findById(UUID.fromString(id))
                .map(existing -> {
                    existing.setName(updatedUser.getName());
                    existing.setEmail(updatedUser.getEmail());
                    existing.setPhone(updatedUser.getPhone());
                    return userRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepo.deleteById(UUID.fromString(id));
    }
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email " + email));
    }
    @GetMapping("/phone/{phone}")
    public User getUserByPhone(@PathVariable String phone) {
        return userRepo.findAll().stream()
                .filter(user -> phone.equals(user.getPhone()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("User not found with phone " + phone));
    }
    @GetMapping("/name/{name}")
    public List<User> getUsersByName(@PathVariable String name) {
        return userRepo.findAll().stream()
                .filter(user -> name.equalsIgnoreCase(user.getName()))
                .toList();
    }
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam(required = false) String name,
                                  @RequestParam(required = false) String email,
                                  @RequestParam(required = false) String phone) {
        return userRepo.findAll().stream()
                .filter(user -> (name == null || user.getName().equalsIgnoreCase(name)) &&
                                (email == null || user.getEmail().equalsIgnoreCase(email)) &&
                                (phone == null || user.getPhone().equals(phone)))
                .toList();
    }
    @GetMapping("/count")
    public long countUsers() {
        return userRepo.count();
    }
    @GetMapping("/exists/{id}")
    public boolean userExists(@PathVariable String id) {
        return userRepo.existsById(UUID.fromString(id));
    }
    @GetMapping("/exists/email/{email}")
    public boolean userExistsByEmail(@PathVariable String email) {
        return userRepo.findByEmail(email).isPresent();
    }
    @GetMapping("/exists/phone/{phone}")
    public boolean userExistsByPhone(@PathVariable String phone) {
        return userRepo.findAll().stream()
                .anyMatch(user -> phone.equals(user.getPhone()));
    }
    @GetMapping("/exists/name/{name}")
    public boolean userExistsByName(@PathVariable String name) {
        return userRepo.findAll().stream()
                .anyMatch(user -> name.equalsIgnoreCase(user.getName()));
    }
    @GetMapping("/active")
    public List<User> getActiveUsers() {
        return userRepo.findAll().stream()
                .filter(user -> user.getCreatedAt().toInstant().isAfter(Instant.now().minusSeconds(60 * 60 * 24 * 30))) // Active in the last 30 days
                .toList();
    }
    @GetMapping("/inactive")
    public List<User> getInactiveUsers() {
        return userRepo.findAll().stream()
                .filter(user -> user.getCreatedAt().toInstant().isBefore(Instant.now().minusSeconds(60 * 60 * 24 * 30))) // Inactive for more than 30 days
                .toList();
    }
    @GetMapping("/recent")
    public List<User> getRecentUsers() {
        return userRepo.findAll().stream()
                .filter(user -> user.getCreatedAt().toInstant().isAfter(Instant.now().minusSeconds(60 * 60 * 24 * 7))) // Created in the last 7 days
                .toList();
    }
    @GetMapping("/oldest")
    public List<User> getOldestUsers() {
        return userRepo.findAll().stream()
                .sorted((u1, u2) -> u1.getCreatedAt().compareTo(u2.getCreatedAt()))
                .toList();
    }
    @GetMapping("/newest")
    public List<User> getNewestUsers() {
        return userRepo.findAll().stream()
                .sorted((u1, u2) -> u2.getCreatedAt().compareTo(u1.getCreatedAt()))
                .toList();
    }
    @GetMapping("/count/active")
    public long countActiveUsers() {
        return userRepo.findAll().stream()
                .filter(user -> user.getCreatedAt().toInstant().isAfter(Instant.now().minusSeconds(60 * 60 * 24 * 30))) // Active in the last 30 days
                .count();
    } 
    @PostMapping("/batch")
    public List<User> createUsers(@RequestBody List<User> users) {
        users.forEach(user -> {
            Optional<User> existing = userRepo.findByEmail(user.getEmail());
            if (existing.isPresent()) {
                throw new RuntimeException("Email already in use: " + user.getEmail());
            }
        });
        return userRepo.saveAll(users);
    }
}
