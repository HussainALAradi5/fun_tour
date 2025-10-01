package com.server.server.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.Models.Location;
import com.server.server.Repositories.LocationRepository;

@Service
public class LocationService {
    @Autowired
    LocationRepository locationRepository;

    public String addLocation(Location location) {
        boolean existingLocation = isLocationNameExist(location.getLocationName());
        if (existingLocation) {
            throw new IllegalArgumentException("Location name already exists.");
        }

        Location savedLocation = locationRepository.save(location);
        return "Location added successfully with ID: " + savedLocation.getLocationId();
    }

    public List<Location> findAllLocaions() {
        return locationRepository.findAll();
    }

    public boolean isLocationNameExist(String locationName) {
        return locationRepository.locationExistByName(locationName);
    }

    public boolean isRegionExist(String region) {
        return locationRepository.locationExistByRegion(region);
    }

}
