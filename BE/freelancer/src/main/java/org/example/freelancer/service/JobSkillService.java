package org.example.freelancer.service;

import org.example.freelancer.dto.JobSkillDTO;

import java.util.List;

public interface JobSkillService {
    List<JobSkillDTO> getAllJobSkills();
    JobSkillDTO addJobSkill(JobSkillDTO jobSkillDTO);
}
