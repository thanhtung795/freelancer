package org.example.freelancer.service;

import org.example.freelancer.dto.FreelancerSkillDTO;

import java.util.List;

public interface FreelancerSkillService {
    List<FreelancerSkillDTO> getAllFreelancerSkills();
    FreelancerSkillDTO addFreelancerSkill(FreelancerSkillDTO freelancerSkillDTO);
}
