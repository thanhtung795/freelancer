package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.*;
import org.example.freelancer.entity.*;
import org.example.freelancer.mapper.*;
import org.example.freelancer.repository.*;
import org.example.freelancer.service.FreelancerService;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService {

    private final FreelancerRepository freelancerRepository;
    private final FreelancerMapper freelancerMapper;

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;


    private final JobsOfFreelancerMapper jobsOfFreelancerMapper;

    private final JobsOfFreelancerByIdAndStatusMapper jobsOfFreelancerByIdAndStatusMapper;

    @Transactional(readOnly = true)
    @Override
    public List<FreelancerDTO> getAllFreelancer() {
        return freelancerRepository.findAll().stream()
                .map(freelancer -> {
                    FreelancerDTO dto = FreelancerMapper.INSTANCE.toDTO(freelancer);

                    // Ánh xạ các danh sách con (freelancerJobs, freelancerSkills, educations)
                    dto.setFreelancerJobs(
                            freelancer.getFreelancerJobs().stream()
                                    .map(FreelancerJobMapper.INSTANCE::toDTO)
                                    .collect(Collectors.toList())
                    );

                    dto.setFreelancerSkills(
                            freelancer.getFreelancerSkills().stream()
                                    .map(FreelancerSkillMapper.INSTANCE::toDto)
                                    .collect(Collectors.toList())
                    );

                    dto.setEducations(
                            freelancer.getEducations().stream()
                                    .map(EducationMapper.INSTANCE::toDto)
                                    .collect(Collectors.toList())
                    );

                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Transactional
    @Override
    public FreelancerDTO addFreelancer(FreelancerDTO freelancerDTO) {
        Freelancer freelancer = freelancerMapper.toEntity(freelancerDTO);

        Category category = categoryRepository.findById(freelancerDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found."));

        User user = userRepository.findById(freelancerDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found."));

        freelancer.setCategory(category);
        freelancer.setUser(user);
        return freelancerMapper.toDTO(freelancerRepository.save(freelancer));
    }

    @Override
    public Optional<FreelancerDTO> updateFreelancer(Integer id, FreelancerDTO freelancerDTO) {
      Freelancer freelancerEixist =  freelancerRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Freelancer not found."));

        Category category = categoryRepository.findById(freelancerDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found."));

        User user = userRepository.findById(freelancerDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found."));

      freelancerEixist.setImage(freelancerDTO.getImage());
      freelancerEixist.setHourlyRate(freelancerDTO.getHourlyRate());
      freelancerEixist.setCategory(category);
      freelancerEixist.setUser(user);
      return Optional.of(freelancerMapper.toDTO(freelancerRepository.save(freelancerEixist)));
    }


    @Override
    public Boolean deleteFreelancer(Integer id) {
        if (!freelancerRepository.existsById(id)) {
            return false;
        }
        freelancerRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Object[]> countFreelancersAndClients() {
        return freelancerRepository.countFreelancersAndClients();
    }

    public CountResultDTO countFreelancersAndClientsDTO() {
        List<Object[]> result = countFreelancersAndClients();
        if (!result.isEmpty()) {
            Object[] counts = result.get(0);
            return new CountResultDTO((Long) counts[0], (Long) counts[1]);
        }
        return new CountResultDTO(0L, 0L); // Nếu không có kết quả nào
    }

    @Override
    public List<FreelancerApplyDTO> findAllByJobId(Integer jobId) {
        List<FreelancerApplyDTO> results = freelancerRepository.findAllByJobId(jobId);

        if (results.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy freelancer nào cho công việc có ID: " + jobId);
        }

        return results;
    }
    @Override
    @Transactional
    public FreelancerDTO updateFreelancerImage(Integer id, String imageUrl) {
        Freelancer freelancer = freelancerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Freelancer không tồn tại với id: " + id));

        freelancer.setImage(imageUrl);
        Freelancer updatedFreelancer = freelancerRepository.save(freelancer);
        return freelancerMapper.toDTO(updatedFreelancer);
    }
    @Override
    @Transactional
    public FreelancerDTO updateFreelancerCategory(Integer id, Integer categoryId) {
        Freelancer freelancer = freelancerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Freelancer không tồn tại với id: " + id));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category không tồn tại với id: " + categoryId));

        freelancer.setCategory(category);
        Freelancer updatedFreelancer = freelancerRepository.save(freelancer);

        return freelancerMapper.toDTO(updatedFreelancer);
    }

    @Override
    @Transactional(readOnly = true)
    public JobsOfFreelancerDTO getJobsOfFreelancer(Integer freelancerId) {
        Freelancer freelancer = freelancerRepository.findByIdWithJobs(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found."));

        JobsOfFreelancerDTO dto = jobsOfFreelancerMapper.toDto(freelancer);

        if (dto == null) {
            throw new RuntimeException("Error mapping Freelancer to DTO");
        }

        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public JobsOfFreelancerByIdAndStatusDTO findJobsByFreelancerIdAndStatus(Integer id, StatusFreelancerJob status) {
        Freelancer freelancer = freelancerRepository.findJobsByFreelancerIdAndStatus(id, status)
                .orElseThrow(() -> new RuntimeException("Freelancer not found."));

        JobsOfFreelancerByIdAndStatusDTO dto = JobsOfFreelancerByIdAndStatusMapper
                .INSTANCE.toDto(freelancer);

        if (dto == null) {
            throw new RuntimeException("Error mapping Freelancer to DTO");
        }

        return dto;
    }

}
