package com.server.server.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.server.server.Models.Currency;
import com.server.server.Repositories.CurrencyRepository;

@Service
public class CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    public String addCurrency(Currency currency) {
        if (currencyRepository.existsByCurrencyCode(currency.getCurrencyCode())) {
            throw new IllegalArgumentException("Currency code already exists.");
        }
        currencyRepository.save(currency);
        return "Currency added successfully with ID: " + currency.getCurrencyId();
    }

    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    public Currency getCurrencyByCode(String currencyCode) {
        return currencyRepository.findByCurrencyCode(currencyCode);
    }
}