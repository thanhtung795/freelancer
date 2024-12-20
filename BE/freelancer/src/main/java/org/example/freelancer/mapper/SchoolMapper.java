package org.example.freelancer.mapper;

import org.example.freelancer.dto.SchoolDTO;
import org.example.freelancer.entity.School;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SchoolMapper {

    SchoolMapper INSTANCE = Mappers.getMapper(SchoolMapper.class);

    SchoolDTO toDto(School school);

    School toEntity(SchoolDTO schoolDTO);

}
