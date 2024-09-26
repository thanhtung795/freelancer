package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.example.freelancer.dto.FreelancerSkillDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.entity.FreelancerSkill;
import org.example.freelancer.entity.Skill;
import org.example.freelancer.mapper.FreelancerSkillMapper;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.repository.FreelancerSkillRepository;
import org.example.freelancer.repository.SkillRepository;
import org.example.freelancer.service.FreelancerSkillService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class FreelancerSkillServiceImpl implements FreelancerSkillService {
    private final FreelancerSkillRepository freelancerSkillRepository;
    private final FreelancerSkillMapper freelancerSkillMapper;

    private final FreelancerRepository freelancerRepository;
    private final SkillRepository skillRepository;

    @Override
    public List<FreelancerSkillDTO> getAllFreelancerSkills() {
        return freelancerSkillRepository.findAll().stream().map(freelancerSkillMapper.INSTANCE::toDto).toList();
    }

    @Override
    public FreelancerSkillDTO addFreelancerSkill(FreelancerSkillDTO freelancerSkillDTO) {

        FreelancerSkill freelancerSkill = freelancerSkillMapper.toEntity(freelancerSkillDTO);
        Freelancer freelancer = freelancerRepository.findById(freelancerSkillDTO.getFreelancerId())
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Skill skill = skillRepository.findById(freelancerSkillDTO.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        freelancerSkill.setFreelancer(freelancer); // Gán freelancer
        freelancerSkill.setSkill(skill); // Gán skill

        return freelancerSkillMapper.toDto(freelancerSkillRepository.save(freelancerSkill));
    }
}
