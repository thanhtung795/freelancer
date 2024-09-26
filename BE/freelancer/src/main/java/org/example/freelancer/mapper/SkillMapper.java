package org.example.freelancer.mapper;

import org.example.freelancer.dto.SkillDTO;
import org.example.freelancer.entity.Skill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    SkillMapper INSTANCE = Mappers.getMapper(SkillMapper.class);

    @Mapping(source = "skillName", target = "skillName")
    SkillDTO toDto(Skill entity);

    @Mapping(source = "skillName", target = "skillName")
    Skill toEntity(SkillDTO dto);
}
