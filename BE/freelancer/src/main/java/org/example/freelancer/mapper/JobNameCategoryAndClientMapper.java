package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobNameCategoryAndClientDTO;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.JobSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface JobNameCategoryAndClientMapper {

    JobNameCategoryAndClientMapper INSTANCE = Mappers.getMapper(JobNameCategoryAndClientMapper.class);

    @Mapping(target = "firstName", source = "client.user.firstName")
    @Mapping(target = "lastName", source = "client.user.lastName")
    @Mapping(target = "categoryName", source = "category.categoryTitle")
    @Mapping(target = "skills", source = "jobSkills")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "company.companyName", source = "client.company.companyName")
    @Mapping(target = "company.phoneContact", source = "client.company.phoneContact")
    @Mapping(target = "company.address", source = "client.company.address")
    @Mapping(target = "company.location", source = "client.company.location")
    @Mapping(target = "company.description ", source = "client.company.description")
    @Mapping(target = "company.clientId", source = "client.company.client.id")
    JobNameCategoryAndClientDTO toDto(Job job);

    @Mapping(target = "client.user.firstName", source = "firstName")
    @Mapping(target = "client.user.lastName", source = "lastName")
    @Mapping(target = "category.categoryTitle", source = "categoryName")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "client.company.companyName", source = "company.companyName")
    @Mapping(target = "client.company.phoneContact", source = "company.phoneContact")
    @Mapping(target = "client.company.address", source = "company.address")
    @Mapping(target = "client.company.location", source = "company.location")
    @Mapping(target = "client.company.description ", source = "company.description")
    @Mapping(target = "client.company.client.id", source = "company.clientId")
    Job toEntity(JobNameCategoryAndClientDTO jobDTO);


    // Phương thức ánh xạ từ danh sách JobSkill sang danh sách tên kỹ năng
    default List<String> mapJobSkillsToNames(List<JobSkill> jobSkills) {
        return jobSkills.stream()
                .map(jobSkill -> jobSkill.getSkill().getSkillName())
                .collect(Collectors.toList());
    }
}
