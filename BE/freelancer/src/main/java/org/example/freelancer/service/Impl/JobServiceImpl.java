package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.Job;
import org.example.freelancer.mapper.JobMapper;
import org.example.freelancer.repository.JobRepository;
import org.example.freelancer.service.JobService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    @Override
    public List<JobDTO> getJobs() {
        return jobRepository.findAll().stream().map(jobMapper::toDto).toList();
    }

    @Override
    public JobDTO addJob(JobDTO dto) {
        Job job = JobMapper.INSTANCE.toEntity(dto);

//        Freelancer freelancer = freelancerRepository.findById(freelancerJobDTO.getFreelancerID())
//                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
//        freelancerJob.setFreelancer(freelancer);

        return jobMapper.toDto(jobRepository.save(job));
    }
}
