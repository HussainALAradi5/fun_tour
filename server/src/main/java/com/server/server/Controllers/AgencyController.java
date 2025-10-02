package com.server.server.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.Agency;
import com.server.server.Services.AgencyService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/agency")
public class AgencyController {

    @Autowired
    AgencyService agencyService;

    @GetMapping
    public ResponseEntity<List<Agency>> showAllAgencies() {
        List<Agency> agency = agencyService.finaAllAgencies();
        return ResponseEntity.ok(agency);
    }

    @PostMapping("/addAgency")
    public ResponseEntity<String> addAgency(@Valid @RequestBody Agency agency) {
        try {
            String message = agencyService.addAgency(agency);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agency> updateAgency(@PathVariable long id, @Valid @RequestBody Agency agency) {
        Agency updated = agencyService.updateAgency(id, agency);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAgency(@PathVariable long id) {
        try {
            agencyService.deleteAgency(id);
            return ResponseEntity.ok("Agency deleted successfully.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }

}
}
