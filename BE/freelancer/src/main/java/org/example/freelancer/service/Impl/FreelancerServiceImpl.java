package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.dto.CountResultDTO;
import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.entity.Category;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.entity.User;
import org.example.freelancer.mapper.*;
import org.example.freelancer.repository.*;
import org.example.freelancer.service.FreelancerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService {

    private final FreelancerRepository freelancerRepository;
    private final FreelancerMapper freelancerMapper;

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    private final UserRepository userRepository;

    private final FreelancerJobMapper freelancerJobMapper;
    private final FreelancerSkillMapper freelancerSkillMapper;
    private final EducationMapper educationMapper;

    private final AccountRepository accountRepository;

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

}
