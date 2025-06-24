package com.pool.poolapp.dto;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

public record CreateReservationRequest(
    UUID poolId,
    UUID userId,
    String email,
    LocalDateTime date,
    ZonedDateTime startTime,
    ZonedDateTime endTime
) {}
