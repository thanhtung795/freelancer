package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.DegreeDTO;
import org.example.freelancer.mapper.DegreeMapper;
import org.example.freelancer.repository.DegreeRepository;
import org.example.freelancer.service.DegreeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DegreeServiceImpl implements DegreeService {
    private final DegreeRepository degreeRepository;
    private final DegreeMapper degreeMapper;

    @Override
    public List<DegreeDTO> getAllDegree() {
        return degreeRepository
                .findAll()
                .stream()
                .map(degreeMapper::toDto)
                .toList();
    }

    @Override
    public DegreeDTO getDegreeById(Integer id) {
        return degreeRepository
                .findById(id)
                .map(degreeMapper::toDto)
                .orElse(null);
    }
}
