package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.Category;
import org.example.freelancer.entity.Client;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.Job;
import org.example.freelancer.mapper.JobMapper;
import org.example.freelancer.repository.CategoryRepository;
import org.example.freelancer.repository.ClientRepository;
import org.example.freelancer.repository.JobRepository;
import org.example.freelancer.service.JobService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    private final ClientRepository clientRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<JobDTO> getJobs() {
        return jobRepository.findAll().stream().map(jobMapper::toDto).toList();
    }

    @Override
    public JobDTO addJob(JobDTO jobDTO) {
        // Chuyển đổi DTO thành thực thể Job
        Job job = JobMapper.INSTANCE.toEntity(jobDTO);

        // Lấy Client từ cơ sở dữ liệu bằng clientId
        Client client = clientRepository.findById(jobDTO.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found")); // Kiểm tra clientId

        // Lấy Category từ cơ sở dữ liệu bằng categoryId
        Category category = categoryRepository.findById(jobDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")); // Kiểm tra categoryId

        // Gán đối tượng Client và Category vào Job
        job.setClient(client);
        job.setCategory(category);

        // Lưu Job vào cơ sở dữ liệu
        return jobMapper.toDto(jobRepository.save(job));
    }
}
