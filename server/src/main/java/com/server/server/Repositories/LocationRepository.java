package com.server.server.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.server.Models.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    boolean existsByRegion(String region);


    boolean existsByLocationName(String locationName);
}
