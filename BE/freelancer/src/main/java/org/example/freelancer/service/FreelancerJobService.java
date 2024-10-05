package org.example.freelancer.service;


import org.example.freelancer.dto.FreelancerJobDTO;

import java.util.List;
import java.util.Optional;

public interface FreelancerJobService {
    List<FreelancerJobDTO> getAllFreelancerJob();
    FreelancerJobDTO addFreelancerJob(FreelancerJobDTO dto);

    Boolean deleteFreelancerJob(Integer freelancerJobID, Integer jobID);
}
