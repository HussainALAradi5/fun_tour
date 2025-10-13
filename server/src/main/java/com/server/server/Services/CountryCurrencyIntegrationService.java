package com.server.server.Services;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.server.DTO.CountryDTO;
import com.server.server.DTO.CurrencyDTO;
import com.server.server.Models.Country;
import com.server.server.Models.Currency;
import com.server.server.Repositories.CountryRepository;
import com.server.server.Repositories.CurrencyRepository;

@Service
public class CountryCurrencyIntegrationService {

    private final ApiIntegrationService apiService;
    private final CountryRepository countryRepo;
    private final CurrencyRepository currencyRepo;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CountryCurrencyIntegrationService(
            ApiIntegrationService apiService,
            CountryRepository countryRepo,
            CurrencyRepository currencyRepo) {
        this.apiService = apiService;
        this.countryRepo = countryRepo;
        this.currencyRepo = currencyRepo;
    }

    public String importCountriesAndCurrencies() throws Exception {
        String countriesJson = apiService.fetchCountriesJson();
        List<CountryDTO> countryDTOs = objectMapper.readValue(
                countriesJson, new TypeReference<List<CountryDTO>>() {
                });

        int countryCount = 0;
        int currencyCount = 0;

        for (CountryDTO dto : countryDTOs) {
            if (dto.getCca2() == null) continue;

            // --- Currency Handling ---
            Currency currencyEntity = null;
            if (dto.getCurrencies() != null && !dto.getCurrencies().isEmpty()) {
                Map.Entry<String, CurrencyDTO> entry = dto.getCurrencies().entrySet().iterator().next();
                String currencyCode = entry.getKey();
                CurrencyDTO cDto = entry.getValue();

                currencyEntity = currencyRepo.findByCurrencyCode(currencyCode);
                if (currencyEntity == null) {
                    currencyEntity = new Currency();
                    currencyEntity.setCurrencyCode(currencyCode);
                    currencyEntity.setCurrencyName(cDto.getName());
                    currencyEntity.setCurrencySymbol(cDto.getSymbol());
                    currencyRepo.save(currencyEntity);
                    currencyCount++;
                }
            }

            if (!countryRepo.existsByIsoCode(dto.getCca2())) {
                Country country = new Country();
                country.setIsoCode(dto.getCca2());
                country.setCountryName(dto.getName() != null && dto.getName().get("official") != null
                        ? dto.getName().get("official").toString()
                        : null);
                country.setCurrency(currencyEntity);
                country.setCountryCode(dto.getCca3());
                country.setLangeuge(dto.getLanguages() != null
                        ? String.join(",", dto.getLanguages().values())
                        : null);
                country.setFlag(dto.getFlags() != null ? dto.getFlags().getPng() : null);

                countryRepo.save(country);
                countryCount++;
            }
        }

        return String.format("Imported %d new countries and %d new currencies.", countryCount, currencyCount);
    }
}
