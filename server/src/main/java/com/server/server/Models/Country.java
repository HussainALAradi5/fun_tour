package com.server.server.Models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long countryId;

    private String isoCode;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;

    private String countryName;
    private String countryCode;
    private String langeuge;
    private String flag;

    @OneToMany(mappedBy = "country")
    @JsonManagedReference
    private List<User> users;
}