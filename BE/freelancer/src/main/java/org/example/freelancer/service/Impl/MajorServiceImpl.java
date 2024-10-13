package org.example.freelancer.service.Impl;

import org.example.freelancer.dto.MajorDTO;
import org.example.freelancer.entity.Major;
import org.example.freelancer.repository.MajorRepository;
import org.example.freelancer.service.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MajorServiceImpl implements MajorService {

    @Autowired
    private MajorRepository majorRepository;

    private MajorDTO convertToDto(Major major) {
        MajorDTO majorDTO = new MajorDTO();
        majorDTO.setMajorId(major.getId());
        majorDTO.setMajorName(major.getMajorName());
        return majorDTO;
    }

    private Major convertToEntity(MajorDTO majorDTO) {
        Major major = new Major();
        major.setId(majorDTO.getMajorId());
        major.setMajorName(majorDTO.getMajorName());
        return major;
    }

    @Override
    public List<MajorDTO> getAllMajors() {
        List<Major> majors = majorRepository.findAll();
        return majors.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<MajorDTO> getMajorById(Integer id) {
        Optional<Major> major = majorRepository.findById(id);
        return major.map(this::convertToDto);
    }

    @Override
    public MajorDTO createMajor(MajorDTO majorDTO) {
        Major major = convertToEntity(majorDTO);
        Major savedMajor = majorRepository.save(major);
        return convertToDto(savedMajor);
    }

    @Override
    public MajorDTO updateMajor(Integer id, MajorDTO majorDetails) {
        Optional<Major> majorOptional = majorRepository.findById(id);
        if (majorOptional.isPresent()) {
            Major existingMajor = majorOptional.get();
            existingMajor.setMajorName(majorDetails.getMajorName());
            Major updatedMajor = majorRepository.save(existingMajor);
            return convertToDto(updatedMajor);
        }
        return null;
    }

    @Override
    public boolean deleteMajor(Integer id) {
        Optional<Major> major = majorRepository.findById(id);
        if (major.isPresent()) {
            majorRepository.delete(major.get());
            return true;
        }
        return false;
    }
}
