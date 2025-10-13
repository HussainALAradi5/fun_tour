package com.server.server.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.Country;
import com.server.server.Models.Currency;
import com.server.server.Repositories.CountryRepository;
import com.server.server.Repositories.CurrencyRepository;
import com.server.server.Services.CountryCurrencyIntegrationService;

@RestController
@RequestMapping("/integration")
public class IntegrationController {

    private final CountryCurrencyIntegrationService integrationService;
    private final CountryRepository countryRepo;
    private final CurrencyRepository currencyRepo;

    public IntegrationController(
            CountryCurrencyIntegrationService integrationService,
            CountryRepository countryRepo,
            CurrencyRepository currencyRepo
    ) {
        this.integrationService = integrationService;
        this.countryRepo = countryRepo;
        this.currencyRepo = currencyRepo;
    }

    @PostMapping("/import")
    public ResponseEntity<String> importCountries() {
        try {
            String result = integrationService.importCountriesAndCurrencies();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryRepo.findAll();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/currencies")
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        List<Currency> currencies = currencyRepo.findAll();
        return ResponseEntity.ok(currencies);
    }

    
}
