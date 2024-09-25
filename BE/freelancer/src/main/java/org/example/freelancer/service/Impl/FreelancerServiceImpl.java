package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.mapper.FreelancerMapper;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.service.FreelancerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService {
    private final FreelancerRepository freelancerRepository;
    private final FreelancerMapper freelancerMapper;

    @Override
    public List<FreelancerDTO> getAllFreelancer() {
        return freelancerRepository.findAll().stream().map(FreelancerMapper.INSTANCE::toDTO).toList();
    }

    @Override
    public FreelancerDTO addFreelancer(FreelancerDTO freelancerDTO) {
        Freelancer freelancer = freelancerMapper.toEntity(freelancerDTO);
        return freelancerMapper.toDTO(freelancerRepository.save(freelancer));
    }
}
