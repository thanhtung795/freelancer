package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.FreelancerJobDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.mapper.FreelancerJobMapper;
import org.example.freelancer.mapper.FreelancerMapper;
import org.example.freelancer.repository.FreelancerJobRepository;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.service.FreelancerJobService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FreelancerJobServiceImpl implements FreelancerJobService {
    private final FreelancerJobRepository freelancerJobRepository;
    private final FreelancerJobMapper freelancerJobMapper;

    private final FreelancerRepository freelancerRepository;

    @Override
    public List<FreelancerJobDTO> getAllFreelancerJob() {
        return freelancerJobRepository.findAll().stream().map(FreelancerJobMapper.INSTANCE::toDTO).toList();
    }

    @Override
    public FreelancerJobDTO addFreelancerJob(FreelancerJobDTO freelancerJobDTO) {
        FreelancerJob freelancerJob = freelancerJobMapper.toEntity(freelancerJobDTO);

        Freelancer freelancer = freelancerRepository.findById(freelancerJobDTO.getFreelancerID())
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        freelancerJob.setFreelancer(freelancer);


        return freelancerJobMapper.toDTO(freelancerJobRepository.save(freelancerJob));
    }
}
