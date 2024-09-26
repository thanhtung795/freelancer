package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobSkillDTO;
import org.example.freelancer.entity.JobSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JobSkillMapper {
    JobSkillMapper INSTANCE = Mappers.getMapper(JobSkillMapper.class);

    @Mapping(target = "jobId", source = "id.jobId")
    @Mapping(target = "skillId", source = "id.skillId")
    JobSkillDTO toDto(JobSkill entity);

    @Mapping(target = "id.jobId", source = "jobId")
    @Mapping(target = "id.skillId", source = "skillId")
    JobSkill toEntity(JobSkillDTO dto);

}
