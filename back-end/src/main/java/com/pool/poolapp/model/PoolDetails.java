package com.pool.poolapp.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "pool_details")
public class PoolDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pool_id", nullable = false, unique = true)
    private Pool pool;

    @Column(name = "cleanup_instructions")
    private String cleanupInstructions;

    @Column(name = "notes")
    private String notes;

    @Column(name = "guest_limit")
    private Integer guestLimit;

    @Column(name = "access_instructions")
    private String accessInstructions;

    @Column(name = "pool_rules")
    private String poolRules;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = ZonedDateTime.now();
    }

    public Pool getPool() {
        return this.pool;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }
    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCleanupInstructions() {
        return this.cleanupInstructions;
    }
    public void setCleanupInstructions(String cleanupInstructions) {
        this.cleanupInstructions = cleanupInstructions;
    }
    public String getNotes() {
        return this.notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public Integer getGuestLimit() {
        return this.guestLimit;
    }
    public void setGuestLimit(Integer guestLimit) {
        this.guestLimit = guestLimit;
    }
    public String getAccessInstructions() {
        return this.accessInstructions;
    }
    public void setAccessInstructions(String accessInstructions) {
        this.accessInstructions = accessInstructions;
    }
    public String getPoolRules() {
        return this.poolRules;
    }
    public void setPoolRules(String poolRules) {
        this.poolRules = poolRules;
    }
    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }
   
    @Override
    public String toString() {
        return "PoolDetails{" +
                "id=" + id +
                ", pool=" + pool +
                ", cleanupInstructions='" + cleanupInstructions + '\'' +
                ", notes='" + notes + '\'' +
                ", guestLimit=" + guestLimit +
                ", accessInstructions='" + accessInstructions + '\'' +
                ", poolRules='" + poolRules + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PoolDetails)) return false;
        PoolDetails that = (PoolDetails) o;
        return id != null && id.equals(that.id);
    }
}
