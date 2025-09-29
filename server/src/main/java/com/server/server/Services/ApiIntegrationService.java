package com.server.server.Services;

import com.server.server.Configuration.ExternalApisConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiIntegrationService {

    private final ExternalApisConfiguration apis;
    private final RestTemplate restTemplate = new RestTemplate();

    public ApiIntegrationService(ExternalApisConfiguration apis) {
        this.apis = apis;
    }

    public String fetchCountriesJson() {
        return restTemplate.getForObject(apis.getRestcountries().getUrl(), String.class);
    }

    public String fetchCurrencyJson() {
        return restTemplate.getForObject(apis.getCurrency().getUrl(), String.class);
    }
}
