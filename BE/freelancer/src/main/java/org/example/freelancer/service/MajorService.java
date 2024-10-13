package org.example.freelancer.service;

import org.example.freelancer.dto.MajorDTO;

import java.util.List;
import java.util.Optional;

public interface MajorService {

    List<MajorDTO> getAllMajors();

    Optional<MajorDTO> getMajorById(Integer id);

    MajorDTO createMajor(MajorDTO majorDTO);

    MajorDTO updateMajor(Integer id, MajorDTO majorDetails);

    boolean deleteMajor(Integer id);
}
