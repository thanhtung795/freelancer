package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobNameCategoryAndClientDTO;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.JobSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface JobNameCategoryAndClientMapper {

    // Ánh xạ từ Job sang JobNameCategoryAndClientDTO
    @Mapping(target = "firstName", source = "client.user.firstName")
    @Mapping(target = "lastName", source = "client.user.lastName")
    @Mapping(target = "categoryName", source = "category.categoryTitle")
    @Mapping(target = "skills", source = "jobSkills")
    JobNameCategoryAndClientDTO toDto(Job job);

    // Ánh xạ từ JobNameCategoryAndClientDTO sang Job
    @Mapping(target = "client.user.firstName", source = "firstName")
    @Mapping(target = "client.user.lastName", source = "lastName")
    @Mapping(target = "category.categoryTitle", source = "categoryName")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    @Mapping(target = "createdAt", source = "dateCreate")
    Job toEntity(JobNameCategoryAndClientDTO jobDTO);

    // Phương thức ánh xạ từ danh sách JobSkill sang danh sách tên kỹ năng
    default List<String> mapJobSkillsToNames(List<JobSkill> jobSkills) {
        return jobSkills.stream()
                .map(jobSkill -> jobSkill.getSkill().getSkillName())
                .collect(Collectors.toList());
    }
}
