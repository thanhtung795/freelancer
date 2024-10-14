package org.example.freelancer.service.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.FreelancerJobDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.StatusFreelancerJob;
import org.example.freelancer.mapper.FreelancerJobMapper;
import org.example.freelancer.mapper.FreelancerMapper;
import org.example.freelancer.repository.FreelancerJobRepository;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.repository.JobRepository;
import org.example.freelancer.service.FreelancerJobService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FreelancerJobServiceImpl implements FreelancerJobService {
    private final FreelancerJobRepository freelancerJobRepository;
    private final FreelancerJobMapper freelancerJobMapper;

    private final FreelancerRepository freelancerRepository;
    private final JobRepository jobRepository;


    @Override
    public List<FreelancerJobDTO> getAllFreelancerJob() {
        return freelancerJobRepository.findAll().stream().map(FreelancerJobMapper.INSTANCE::toDTO).toList();
    }

    @Override
    public FreelancerJobDTO addFreelancerJob(FreelancerJobDTO freelancerJobDTO) {
        FreelancerJob freelancerJob = freelancerJobMapper.toEntity(freelancerJobDTO);

        Freelancer freelancer = freelancerRepository.findById(freelancerJobDTO.getFreelancerID())
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Job job = jobRepository.findById(freelancerJobDTO.getJobID())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        freelancerJob.setJob(job);
        freelancerJob.setFreelancer(freelancer);

        return freelancerJobMapper.toDTO(freelancerJobRepository.save(freelancerJob));
    }

    @Override
    public Boolean deleteFreelancerJob(Integer freelancerJobID, Integer jobID) {
//        Optional<FreelancerJob> optionalFreelancerJob =  freelancerJobRepository.findById(freelancerJobID);
//
//        if (optionalFreelancerJob.isPresent()) {
//            freelancerJobRepository.deleteById(freelancerJobID);
//            return true;
//        }
//        return false;
        return true;
    }

    @Override
    public FreelancerJobDTO updateFreelancerJobStatus(Integer freelancerID, Integer jobID, String status) {
        // Tìm kiếm FreelancerJob dựa trên freelancerID và jobID
        FreelancerJob freelancerJob = freelancerJobRepository.findById_FreelancerIdAndId_JobId(freelancerID, jobID)
                .orElseThrow(() -> new EntityNotFoundException("FreelancerJob not found"));

        StatusFreelancerJob newStatus = StatusFreelancerJob.fromDisplayName(status);

        // Cập nhật status mới
        freelancerJob.setStatus(newStatus);

        // Lưu lại sự thay đổi vào database
        FreelancerJob updatedFreelancerJob = freelancerJobRepository.save(freelancerJob);

        // Chuyển đổi entity thành DTO để trả về
        FreelancerJobDTO freelancerJobDTO = new FreelancerJobDTO();
        freelancerJobDTO.setFreelancerID(freelancerID);
        freelancerJobDTO.setJobID(jobID);
        freelancerJobDTO.setStatus(updatedFreelancerJob.getStatus());
        freelancerJobDTO.setIsSelected(updatedFreelancerJob.getIsSelected());

        return freelancerJobDTO;
    }
}
