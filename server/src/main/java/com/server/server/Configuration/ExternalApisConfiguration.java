package com.server.server.Configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "external.api")
public class ExternalApisConfiguration {

    private RestCountries restcountries;
    private Currency currency;

    @Data
    public static class RestCountries {
        private String url;
    }

    @Data
    public static class Currency {
        private String url;
    }
}
