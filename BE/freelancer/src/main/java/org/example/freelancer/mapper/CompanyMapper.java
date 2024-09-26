package org.example.freelancer.mapper;

import org.example.freelancer.dto.CompanyDTO;
import org.example.freelancer.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {
    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);

    Company companyDTOToCompany(CompanyDTO companyDTO);
    CompanyDTO companyToCompanyDTO(Company company);
}
