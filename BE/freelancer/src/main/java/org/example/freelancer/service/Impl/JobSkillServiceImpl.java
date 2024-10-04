package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobSkillDTO;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.JobSkill;
import org.example.freelancer.entity.Skill;
import org.example.freelancer.mapper.JobSkillMapper;
import org.example.freelancer.repository.JobRepository;
import org.example.freelancer.repository.JobSkillRepository;
import org.example.freelancer.repository.SkillRepository;
import org.example.freelancer.service.JobSkillService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class JobSkillServiceImpl implements JobSkillService {

    private final JobSkillRepository jobSkillRepository;
    private final JobSkillMapper jobSkillMapper;

    private final JobRepository jobRepository;

    private final SkillRepository skillRepository;


    @Override
    public List<JobSkillDTO> getAllJobSkills() {
        return jobSkillRepository.findAll().stream().map(jobSkillMapper::toDto).toList();
    }

    @Override
    public JobSkillDTO addJobSkill(JobSkillDTO jobSkillDTO) {
        JobSkill jobSkill = jobSkillMapper.toEntity(jobSkillDTO);


        return jobSkillMapper.toDto(jobSkillRepository.save(jobSkill));
    }

    @Override
    public Optional<JobSkillDTO> updateJobSkill(Integer id, JobSkillDTO jobSkillDTO) {
        JobSkill jobSkill = jobSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("JobSkill not found."));

        Job job = jobRepository.findById(jobSkillDTO.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found."));

        Skill skill = skillRepository.findById(jobSkillDTO.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found."));

        jobSkill.setJob(job);
        jobSkill.setSkill(skill);
        return Optional.of(jobSkillMapper.toDto(jobSkillRepository.save(jobSkill)));
    }

    @Override
    public JobSkillDTO deleteJobSkill(Integer id) {
        JobSkill jobSkill = jobSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("JobSkill not found."));
        jobSkillRepository.delete(jobSkill);
        return jobSkillMapper.toDto(jobSkill);
    }
}
