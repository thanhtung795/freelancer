package org.example.freelancer.service;

import org.example.freelancer.dto.SkillDTO;

import java.util.List;
import java.util.Optional;

public interface SkillService {
    List<SkillDTO> getAllSkill();
    SkillDTO addSkillDto(SkillDTO skillDTO);
    Optional<SkillDTO> updateSKillDTO(Integer id, SkillDTO skillDTO);
   Boolean deleteSkillDTO(Integer id);
}
