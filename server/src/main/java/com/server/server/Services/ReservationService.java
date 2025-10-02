package com.server.server.Services;

import com.server.server.Models.Reservation;
import com.server.server.Repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation updateReservation(Long id, Reservation updated) {
        return reservationRepository.findById(id).map(existing -> {
            existing.setReservationDate(updated.getReservationDate());
            existing.setStatus(updated.getStatus());
            existing.setNumberOfPeople(updated.getNumberOfPeople());
            existing.setTotalPrice(updated.getTotalPrice());
            existing.setUser(updated.getUser());
            existing.setTour(updated.getTour());
            return reservationRepository.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Reservation not found with id " + id));
    }

    public void deleteReservation(Long id) {
        if (!reservationRepository.existsById(id)) {
            throw new IllegalArgumentException("Reservation not found with id " + id);
        }
        reservationRepository.deleteById(id);
    }

    public List<Reservation> findReservationsByUser(Long userId) {
        return reservationRepository.findByUser_UserId(userId);
    }

    public List<Reservation> findReservationsByTour(Long tourId) {
        return reservationRepository.findByTour_TourId(tourId);
    }
}
