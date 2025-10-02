package com.server.server.Services;

import com.server.server.Enums.TicketTypeEnum;
import com.server.server.Models.Ticket;
import com.server.server.Repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Ticket addTicket(Ticket ticket) {
        if (ticket.getType() == TicketTypeEnum.CHILD) {
            ticket.setPrice(ticket.getPrice() - (0.15 * ticket.getPrice()));
        }
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket updateTicket(Long id, Ticket updated) {
        return ticketRepository.findById(id).map(existing -> {
            existing.setType(updated.getType());
            double newPrice = updated.getPrice();
            if (updated.getType() == TicketTypeEnum.CHILD) {
                newPrice = newPrice - (0.15 * newPrice);
            }
            existing.setPrice(newPrice);
            existing.setTour(updated.getTour());
            existing.setReservation(updated.getReservation());
            return ticketRepository.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Ticket not found with id " + id));
    }

    public void deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new IllegalArgumentException("Ticket not found with id " + id);
        }
        ticketRepository.deleteById(id);
    }
}
