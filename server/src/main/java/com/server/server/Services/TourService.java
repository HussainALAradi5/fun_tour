package com.server.server.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.Models.Tour;
import com.server.server.Repositories.TourRepository;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public Tour addTour(Tour tour) {
        if (tourRepository.existsByTourName(tour.getTourName())) {
            throw new IllegalArgumentException("Tour with this name already exists.");
        }
        return tourRepository.save(tour);
    }

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public Optional<Tour> getTourById(Long id) {
    return tourRepository.findById(id);
}

    public Tour updateTour(Long id, Tour updated) {
        return tourRepository.findById(id).map(existing -> {
            existing.setTourName(updated.getTourName());
            existing.setStartDate(updated.getStartDate());
            existing.setEndDate(updated.getEndDate());
            existing.setCapacity(updated.getCapacity());
            existing.setBasePrice(updated.getBasePrice());
            return tourRepository.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Tour not found with id " + id));
    }

    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new IllegalArgumentException("Tour not found with id " + id);
        }
        tourRepository.deleteById(id);
    }
}
