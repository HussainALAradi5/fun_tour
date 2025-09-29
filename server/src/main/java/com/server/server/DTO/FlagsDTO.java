package com.server.server.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FlagsDTO {
    private String png;
    private String svg;
}
