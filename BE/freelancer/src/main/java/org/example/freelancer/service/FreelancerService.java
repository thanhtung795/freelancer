package org.example.freelancer.service;

import org.example.freelancer.dto.*;
import org.example.freelancer.entity.StatusFreelancerJob;

import java.util.List;
import java.util.Optional;

public interface FreelancerService {
    List<FreelancerDTO> getAllFreelancer();
    FreelancerDTO addFreelancer(FreelancerDTO freelancerDTO);
    Optional<FreelancerDTO> updateFreelancer(Integer id,FreelancerDTO freelancerDTO);
    Boolean deleteFreelancer(Integer id);
    List<Object[]> countFreelancersAndClients();
    CountResultDTO countFreelancersAndClientsDTO();
    List<FreelancerApplyDTO> findAllByJobId(Integer JobId);
    FreelancerDTO updateFreelancerImage(Integer id, String imageUrl);
    FreelancerDTO updateFreelancerCategory(Integer id, Integer categoryId);
    JobsOfFreelancerDTO getJobsOfFreelancer(Integer id);
    JobsOfFreelancerByIdAndStatusDTO findJobsByFreelancerIdAndStatus(Integer id, StatusFreelancerJob status);
}
