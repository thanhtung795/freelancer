package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.EducationDTO;
import org.example.freelancer.entity.*;
import org.example.freelancer.mapper.EducationMapper;
import org.example.freelancer.repository.*;
import org.example.freelancer.service.EducationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;
    private final EducationMapper educationMapper;

    private final FreelancerRepository freelancerRepository;

    private final SchoolRepository schoolRepository;

    private final MajorRepository majorRepository;

    private final DegreeRepository degreeRepository;


    @Override
    public List<EducationDTO> getEducations() {
        return educationRepository.findAll().stream().map(educationMapper::toDto).toList();
    }

    @Override
    public EducationDTO getEducationById(Integer id) {
        try {
            EducationDTO educationDTO = educationRepository.findById(id).map(educationMapper::toDto)
                    .orElseThrow(() -> new RuntimeException("Education not found."));
            return educationDTO;
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public EducationDTO addEducation(EducationDTO educationDTO) {
        Education education = educationMapper.toEntity(educationDTO);
        Freelancer freelancer = freelancerRepository
                .findById(educationDTO.getFreelancerId()).orElse(null);
        School school = schoolRepository.findById(educationDTO.getSchoolId()).orElse(null);
        Major major = majorRepository.findById(educationDTO.getMajorId()).orElse(null);
        Degree degree = degreeRepository.findById(educationDTO.getDegreeId()).orElse(null);
        if (freelancer != null && school != null && major != null && degree != null) {

            education.setFreelancer(freelancer);
            education.setSchool(school);
            education.setMajor(major);
            education.setDegree(degree);
            return educationMapper.toDto(educationRepository.save(education));
        }
        else
            throw new RuntimeException("Add education error");
    }

    @Override
    public EducationDTO updateEducation(Integer id, EducationDTO educationDTO) {
        return null;
    }

    @Override
    public void deleteEducation(Integer id) {

    }
}
