package org.example.freelancer.service.impl;

import org.example.freelancer.dto.CompanyDTO;
import org.example.freelancer.mapper.CompanyMapper;
import org.example.freelancer.entity.Company;
import org.example.freelancer.repository.CompanyRepository;
import org.example.freelancer.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(CompanyMapper.INSTANCE::companyToCompanyDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        Company company = CompanyMapper.INSTANCE.companyDTOToCompany(companyDTO);
        Company savedCompany = companyRepository.save(company);
        return CompanyMapper.INSTANCE.companyToCompanyDTO(savedCompany);
    }

    @Override
    public Optional<CompanyDTO> getCompanyById(Integer id) {
        return companyRepository.findById(id)
                .map(CompanyMapper.INSTANCE::companyToCompanyDTO);
    }

    @Override
    public CompanyDTO updateCompany(Integer id, CompanyDTO companyDTO) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found."));

        company.setCompanyName(companyDTO.getCompanyName());
        company.setPhoneContact(companyDTO.getPhoneContact());
        company.setAddress(companyDTO.getAddress());
        company.setLocation(companyDTO.getLocation());
        // Nếu có một Client, có thể lấy từ ID và gán
        // company.setClientID(clientRepository.findById(companyDTO.getClientID()).orElse(null));

        Company updatedCompany = companyRepository.save(company);
        return CompanyMapper.INSTANCE.companyToCompanyDTO(updatedCompany);
    }

    @Override
    public void deleteCompany(Integer id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found.");
        }
        companyRepository.deleteById(id);
    }
}
