package org.example.freelancer.service;

import org.example.freelancer.dto.SkillDTO;

import java.util.List;

public interface SkillService {
    List<SkillDTO> getAllSkill();

    SkillDTO addSkillDto(SkillDTO skillDTO);
}
