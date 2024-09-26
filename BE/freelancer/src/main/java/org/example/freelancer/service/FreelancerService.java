package org.example.freelancer.service;

import org.example.freelancer.dto.FreelancerDTO;

import java.util.List;

public interface FreelancerService {
    List<FreelancerDTO> getAllFreelancer();
    FreelancerDTO addFreelancer(FreelancerDTO freelancerDTO);
}
