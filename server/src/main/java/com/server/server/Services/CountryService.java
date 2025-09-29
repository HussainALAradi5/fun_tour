package com.server.server.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.Models.Country;
import com.server.server.Repositories.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public String addCountry(Country country) {
        if (countryRepository.existsByIsoCode(country.getIsoCode()))
            throw new IllegalArgumentException("Country with this ISOcode is already exist!");
        countryRepository.save(country);
        return "Country Added Successfully with ID: " + country.getCountryId();

    }
    
    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    public Country getCountryByIsoCode(String isoCode){
        return countryRepository.findByIsoCode(isoCode);
    }

}
