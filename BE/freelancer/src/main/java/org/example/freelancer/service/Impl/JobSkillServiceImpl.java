package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobSkillDTO;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.JobSkill;
import org.example.freelancer.mapper.JobSkillMapper;
import org.example.freelancer.repository.JobSkillRepository;
import org.example.freelancer.service.JobSkillService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobSkillServiceImpl  implements JobSkillService {
    private final JobSkillRepository jobSkillRepository;
    private final JobSkillMapper jobSkillMapper;


    @Override
    public List<JobSkillDTO> getAllJobSkills() {
        return jobSkillRepository.findAll().stream().map(jobSkillMapper::toDto).toList();
    }

    @Override
    public JobSkillDTO addJobSkill(JobSkillDTO jobSkillDTO) {
        JobSkill jobSkill = jobSkillMapper.toEntity(jobSkillDTO);


        return jobSkillMapper.toDto(jobSkillRepository.save(jobSkill));
    }
}
