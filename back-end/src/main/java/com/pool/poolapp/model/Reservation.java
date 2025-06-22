package com.pool.poolapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column
    private String email;

    @Column
    private ZonedDateTime date;

    @Column
    private UUID userId; 

    @Column
    private UUID poolId; 

    @Column
    private ZonedDateTime startTime; 

    @Column
    private ZonedDateTime endTime; 

}
