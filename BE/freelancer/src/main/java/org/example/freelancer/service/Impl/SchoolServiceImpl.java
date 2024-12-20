package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.SchoolDTO;
import org.example.freelancer.entity.School;
import org.example.freelancer.mapper.SchoolMapper;
import org.example.freelancer.repository.SchoolRepository;
import org.example.freelancer.service.SchoolService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolMapper schoolMapper;

    @Override
    public List<SchoolDTO> getAllSchools() {
        return schoolRepository.findAll().stream().map(schoolMapper.INSTANCE::toDto).toList();
    }

    @Override
    public SchoolDTO addSchool(SchoolDTO schoolDTO) throws Exception {
        try {
            School school = schoolMapper.toEntity(schoolDTO);
            return schoolMapper.toDto(schoolRepository.save(school));
        }catch (Exception e){
            throw  new Exception("Add school error ", e);
        }
    }

    @Override
    public SchoolDTO updateSchool(Integer id, SchoolDTO schoolDTO) {
        School school = schoolRepository.findById(id).orElse(null);

        if (school != null) {
            school.setSchoolName(schoolDTO.getSchoolName());
            return schoolMapper.toDto(schoolRepository.save(school));
        }

        return null;
    }

    @Override
    public Object deleteSchool(Integer id) {
        try {
            schoolRepository.deleteById(id);
        }catch (Exception e){
            throw  new RuntimeException("Delete school error ", e);
        }
        return null;
    }
}
