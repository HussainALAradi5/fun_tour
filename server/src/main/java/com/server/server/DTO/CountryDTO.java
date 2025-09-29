package com.server.server.DTO;

import java.util.Map;

import lombok.Data;

@Data
public class CountryDTO {
    private Map<String, Object> name;
    private String cca2;
    private String cca3;
    private Map<String, String> languages;
    private Map<String, CurrencyDTO> currencies;
    private FlagsDTO flags;
}
