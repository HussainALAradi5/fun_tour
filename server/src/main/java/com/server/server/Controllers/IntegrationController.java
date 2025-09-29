package com.server.server.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Services.CountryCurrencyIntegrationService;

@RestController
@RequestMapping("/integration")
public class IntegrationController {

    private final CountryCurrencyIntegrationService integrationService;

    public IntegrationController(CountryCurrencyIntegrationService integrationService) {
        this.integrationService = integrationService;
    }

    @PostMapping("/import")
    public ResponseEntity<String> importCountries() {
        try {
            integrationService.importCountriesAndCurrencies();
            return ResponseEntity.ok("Countries and currencies imported successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
