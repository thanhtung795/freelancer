package org.example.freelancer.service;

import org.example.freelancer.dto.CountResultDTO;
import org.example.freelancer.dto.FreelancerApplyDTO;
import org.example.freelancer.dto.FreelancerDTO;

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
}
