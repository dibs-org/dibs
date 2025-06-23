package com.pool.poolapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column
    private String email;

    @Column
    private ZonedDateTime date;

    @Column
    private UUID userId; 

    @Column(nullable = false)
    private UUID poolId; 

    @Column
    private ZonedDateTime startTime; 

    @Column
    private ZonedDateTime endTime; 

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getPoolId() {
        return poolId;
    }

    public void setPoolId(UUID poolId) {
        this.poolId = poolId;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

}
