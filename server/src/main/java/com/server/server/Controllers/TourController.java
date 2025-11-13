package com.server.server.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.Tour;
import com.server.server.Services.TourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    @PostMapping
    public ResponseEntity<Tour> addTour(@Valid @RequestBody Tour tour) {
        return ResponseEntity.ok(tourService.addTour(tour));
    }

    @GetMapping("/{id}")
public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
    return tourService.getTourById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable Long id, @Valid @RequestBody Tour tour) {
        return ResponseEntity.ok(tourService.updateTour(id, tour));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok("Tour deleted successfully.");
    }

    
}
