package org.example.freelancer.service;


import org.example.freelancer.dto.FreelancerJobDTO;
import org.example.freelancer.entity.StatusFreelancerJob;

import java.util.List;
import java.util.Optional;

public interface FreelancerJobService {
    List<FreelancerJobDTO> getAllFreelancerJob();
    FreelancerJobDTO addFreelancerJob(FreelancerJobDTO dto);

    Boolean deleteFreelancerJob(Integer freelancerJobID, Integer jobID);

    FreelancerJobDTO updateFreelancerJobStatus(Integer freelancerID, Integer jobID, String newStatus);
}
