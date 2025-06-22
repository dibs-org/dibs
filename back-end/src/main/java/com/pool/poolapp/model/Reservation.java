// --- Reservation Entity ---
package com.pool.poolapp.model;

import jakarta.persistence.*;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @ManyToOne
    @JoinColumn(name = "slot_id")
    private Slot slot;

    // Getters and setters
}