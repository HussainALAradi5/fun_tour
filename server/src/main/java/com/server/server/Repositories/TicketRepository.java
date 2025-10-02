package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.server.server.Models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
