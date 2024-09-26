package org.example.freelancer.mapper;

import org.example.freelancer.dto.FreelancerSkillDTO;
import org.example.freelancer.entity.FreelancerSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface FreelancerSkillMapper {

    FreelancerSkillMapper INSTANCE = Mappers.getMapper(FreelancerSkillMapper.class);

    // Sửa lại freelancerID thành freelancerId và skillID thành skillId
    @Mapping(target = "freelancerId", source = "id.freelancerId")
    @Mapping(target = "skillId", source = "id.skillId")
    FreelancerSkillDTO toDto(FreelancerSkill entity);

    @Mapping(target = "id.freelancerId", source = "freelancerId")
    @Mapping(target = "id.skillId", source = "skillId")
    FreelancerSkill toEntity(FreelancerSkillDTO dto);

    }
