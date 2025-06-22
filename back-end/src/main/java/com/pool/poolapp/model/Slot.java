// --- Slot Entity ---
package com.pool.poolapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int capacity;

    // Getters and setters
}
