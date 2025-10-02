package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.server.Models.Agency;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {

    boolean existsByAgencyName(String agencyName);
    boolean existsByAgencyCode(String agencyCode);
}
