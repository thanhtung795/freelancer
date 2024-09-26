package org.example.freelancer.service;

import org.example.freelancer.dto.CompanyDTO;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    List<CompanyDTO> getAllCompanies();
    CompanyDTO createCompany(CompanyDTO companyDTO);
    Optional<CompanyDTO> getCompanyById(Integer id);
    CompanyDTO updateCompany(Integer id, CompanyDTO companyDTO);
    void deleteCompany(Integer id);
}
