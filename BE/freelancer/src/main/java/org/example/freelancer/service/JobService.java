package org.example.freelancer.service;

import org.example.freelancer.dto.JobDTO;

import java.util.List;

public interface JobService {
    List<JobDTO> getJobs();
    JobDTO addJob(JobDTO dto);
}
