package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.server.Models.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    boolean existsByIsoCode(String isoCode);

    Country findByIsoCode(String isoCode);

}
