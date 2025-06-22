package com.pool.poolapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pool")
public class Pool {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column
    private String address;

    @Column
    private String description;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private UUID owner;

    // Optionally, you can map this as a @ManyToOne relationship if you have a User entity
    // @ManyToOne
    // @JoinColumn(name = "owner", nullable = false)
    // private User owner;
}
