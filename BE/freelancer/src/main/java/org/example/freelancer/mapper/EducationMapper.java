package org.example.freelancer.mapper;

import org.example.freelancer.dto.EducationDTO;
import org.example.freelancer.entity.Education;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EducationMapper {
    EducationMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(EducationMapper.class);

    @Mapping(source = "id.freelancerId", target = "freelancerId")
    @Mapping(source = "id.schoolId", target = "schoolId")
    @Mapping(source = "major.id", target = "majorId")
    @Mapping(source = "degree.id", target = "degreeId")
    @Mapping(source = "dateStart", target = "dateStart")
    @Mapping(source = "dateEnd", target = "dateEnd")
    EducationDTO toDto(Education education);

    @Mapping(source = "freelancerId", target = "id.freelancerId")
    @Mapping(source = "schoolId", target = "id.schoolId")
    @Mapping(source = "majorId", target = "major.id")
    @Mapping(source = "degreeId", target = "degree.id")
    @Mapping(source = "dateStart", target = "dateStart")
    @Mapping(source = "dateEnd", target = "dateEnd")

    Education toEntity(EducationDTO educationDTO);
}
