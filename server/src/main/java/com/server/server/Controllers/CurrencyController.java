package com.server.server.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.Currency;
import com.server.server.Services.CurrencyService;

@RestController
@RequestMapping("/currencies")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @PostMapping("/add")
    public ResponseEntity<String> addCurrency(@RequestBody Currency currency) {
        try {
            String message = currencyService.addCurrency(currency);
            return ResponseEntity.status(201).body(message);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        return ResponseEntity.ok(currencyService.getAllCurrencies());
    }

    @GetMapping("/{currencyCode}")
    public ResponseEntity<Currency> getCurrencyByCode(@PathVariable String currencyCode) {
        Currency currency = currencyService.getCurrencyByCode(currencyCode);
        if (currency == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(currency);
    }
}