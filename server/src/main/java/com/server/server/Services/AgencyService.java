package com.server.server.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.Models.Agency;
import com.server.server.Repositories.AgencyRepository;

@Service
public class AgencyService {

    @Autowired
    AgencyRepository agencyRepository;

    public String addAgency(Agency agency) {
        boolean existingAgency = isAgencyExist(agency.getAgencyName()) || isAgencyCodeExist(agency.getAgencyCode());

        if (existingAgency)
            throw new IllegalArgumentException("Agency which this  name is already exists.");

        Agency savedAgency = agencyRepository.save(agency);
        return "Agency have beren added successfully with this name:" + savedAgency.getAgencyName();
    }

    public List<Agency> finaAllAgencies() {
        return agencyRepository.findAll();
    }

    public boolean isAgencyExist(String agencyName) {
        return agencyRepository.agencyExistByName(agencyName);
    }

    public boolean isAgencyCodeExist(String agencyCode) {
        return agencyRepository.agencyExistByCode(agencyCode);
    }

}
