package org.example.freelancer.service;

import org.example.freelancer.dto.DegreeDTO;

import java.util.List;

public interface DegreeService {
    List<DegreeDTO> getAllDegree();

    DegreeDTO getDegreeById(Integer id);
}
