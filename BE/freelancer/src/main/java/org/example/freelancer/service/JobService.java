package org.example.freelancer.service;

import org.example.freelancer.dto.JobDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface JobService {
    List<JobDTO> getJobs();

    @Transactional
    JobDTO changeStatus(Integer id, JobDTO jobDTO);

    JobDTO addJob(JobDTO dto);
    Optional<JobDTO> updateJob(Integer id, JobDTO jobDTO);
  Boolean deleteJob(Integer id);
    Optional<JobDTO> getJobById(Integer id);
}
