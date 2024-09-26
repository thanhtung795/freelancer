package org.example.freelancer.service;


import org.example.freelancer.dto.FreelancerJobDTO;

import java.util.List;

public interface FreelancerJobService {
    List<FreelancerJobDTO> getAllFreelancerJob();

    FreelancerJobDTO addFreelancerJob(FreelancerJobDTO dto);
}
