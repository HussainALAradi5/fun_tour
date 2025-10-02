package com.server.server.Models;

import com.server.server.Enums.TicketTypeEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @NotNull(message = "Ticket type cannot be null")
    @Enumerated(EnumType.STRING)
    private TicketTypeEnum type; 

    @Min(value = 0, message = "Price must not be negative")
    private double price;

    @ManyToOne
    @JoinColumn(name = "tourId", nullable = false)
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "reservationId", nullable = false)
    private Reservation reservation;
}
