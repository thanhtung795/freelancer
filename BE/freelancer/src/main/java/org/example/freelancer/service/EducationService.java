package org.example.freelancer.service;

import org.example.freelancer.dto.EducationDTO;

import java.util.List;

public interface EducationService {
    List<EducationDTO> getEducations();
    EducationDTO getEducationById(Integer id);
    EducationDTO addEducation(EducationDTO educationDTO);
    EducationDTO updateEducation(Integer id, EducationDTO educationDTO);
    void deleteEducation(Integer id);
}
