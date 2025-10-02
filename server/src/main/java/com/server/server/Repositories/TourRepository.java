package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.server.server.Models.Tour;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    boolean existsByTourName(String tourName);
}
