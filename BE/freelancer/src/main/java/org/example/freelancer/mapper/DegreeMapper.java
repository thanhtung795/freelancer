package org.example.freelancer.mapper;

import org.example.freelancer.dto.DegreeDTO;
import org.example.freelancer.entity.Degree;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DegreeMapper {

    DegreeMapper INSTANCE = Mappers.getMapper(DegreeMapper.class);

    DegreeDTO toDto(Degree entity);

    Degree toEntity(DegreeDTO dto);
}
