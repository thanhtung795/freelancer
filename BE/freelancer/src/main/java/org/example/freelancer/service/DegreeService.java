package org.example.freelancer.service;

import org.example.freelancer.dto.DegreeDTO;

import java.util.List;
import java.util.Optional;

public interface DegreeService {
    List<DegreeDTO> getAllDegree();

    Optional<DegreeDTO> getDegreeById(Integer id);
}
