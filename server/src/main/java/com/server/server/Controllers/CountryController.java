package com.server.server.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.Country;
import com.server.server.Services.CountryService;

@RestController
@RequestMapping("countries")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @PostMapping("/add")
    public ResponseEntity<String> addCountry(@RequestBody Country country) {
        try {
            String message = countryService.addCountry(country);
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/{isoCode}")
    public ResponseEntity<Country> getCountryByIsoCode(@PathVariable String isoCode) {
        Country country = countryService.getCountryByIsoCode(isoCode);
        if (country == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(country);
    }

}
