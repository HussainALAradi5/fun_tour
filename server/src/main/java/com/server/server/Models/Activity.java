package com.server.server.Models;

import com.server.server.Enums.ActivityStatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @NotEmpty(message = "Activity name must not be empty")
    private String name;

    private String description;

    @NotNull(message = "Duration is required")
    private double durationHours;

    @NotNull(message = "Start date cannot be null")
    private LocalDate startDate;

    @NotNull(message = "End date cannot be null")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "startLocationId", nullable = false)
    private Location startLocation;

    @ManyToOne
    @JoinColumn(name = "endLocationId", nullable = false)
    private Location endLocation;

    @Enumerated(EnumType.STRING)
    private ActivityStatusEnum status;

    @ManyToOne
    @JoinColumn(name = "tourId")
    private Tour tour;
}
