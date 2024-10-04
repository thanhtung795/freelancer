package org.example.freelancer.service;

import org.example.freelancer.dto.JobSkillDTO;

import java.util.List;
import java.util.Optional;

public interface JobSkillService {
    List<JobSkillDTO> getAllJobSkills();
    JobSkillDTO addJobSkill(JobSkillDTO jobSkillDTO);
    Optional<JobSkillDTO> updateJobSkill(Integer id,JobSkillDTO jobSkillDTO);
    JobSkillDTO deleteJobSkill(Integer id);
}
