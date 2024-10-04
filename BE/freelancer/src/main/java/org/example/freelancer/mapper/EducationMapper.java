package org.example.freelancer.mapper;

import org.example.freelancer.dto.EducationDTO;
import org.example.freelancer.entity.Education;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EducationMapper {
    EducationMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(EducationMapper.class);

    @Mapping(source = "id.freelancerId", target = "freelancerId")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "major.id", target = "majorId", defaultValue = "0") // Giá trị mặc định nếu null
    @Mapping(source = "degree.id", target = "degreeId", defaultValue = "0")
    EducationDTO toDto(Education education);

    @Mapping(source = "freelancerId", target = "id.freelancerId")
    @Mapping(source = "schoolId", target = "school.id")
    @Mapping(source = "majorId", target = "major.id")
    @Mapping(source = "degreeId", target = "degree.id")
    Education toEntity(EducationDTO educationDTO);
}
