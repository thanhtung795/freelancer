package org.example.freelancer.service;

import org.example.freelancer.dto.SchoolDTO;

import java.util.List;

public interface SchoolService {
    List<SchoolDTO> getAllSchools();
    SchoolDTO addSchool(SchoolDTO schoolDTO) throws Exception;
    SchoolDTO updateSchool(Integer id, SchoolDTO schoolDTO);
    void deleteSchool(Integer id);

}
