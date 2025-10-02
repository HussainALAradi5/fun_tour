package com.server.server.Models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tourId;
    @NotEmpty(message = "Tour name must not be empty")
    private String tourName;
    @NotNull(message = "Start date must not be null")
    private LocalDate startDate;
    @NotNull(message = "End date must not be null")
    private LocalDate endDate;
    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;
    @Min(value = 0, message = "Price must not be negative")
    private double basePrice;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets;
}
