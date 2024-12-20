package org.example.freelancer.service.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.dto.JobNameCategoryAndClientDTO;
import org.example.freelancer.entity.Category;
import org.example.freelancer.entity.Client;
import org.example.freelancer.entity.Job;
import org.example.freelancer.mapper.JobMapper;
import org.example.freelancer.mapper.JobNameCategoryAndClientMapper;
import org.example.freelancer.repository.CategoryRepository;
import org.example.freelancer.repository.ClientRepository;
import org.example.freelancer.repository.CompanyRepository;
import org.example.freelancer.repository.JobRepository;
import org.example.freelancer.service.JobService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    private final JobNameCategoryAndClientMapper jobNameCategoryAndClientMapper;

    private final ClientRepository clientRepository;
    private final CategoryRepository categoryRepository;

    private final CompanyRepository companyRepository;


    @Override
    public Optional<JobDTO> updateJob(Integer id, JobDTO jobDTO) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found."));

        // Lấy Client từ cơ sở dữ liệu bằng clientId
        Client client = clientRepository.findById(jobDTO.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found")); // Kiểm tra clientId

        // Lấy Category từ cơ sở dữ liệu bằng categoryId
        Category category = categoryRepository.findById(jobDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")); // Kiểm tra categoryId

        job.setTitle(jobDTO.getTitle());
        job.setScope(jobDTO.getScope());
        job.setHourWork(jobDTO.getHourWork());
        job.setJobOpportunity(jobDTO.getJobOpportunity());
        job.setFromPrice(jobDTO.getFromPrice());
        job.setToPrice(jobDTO.getToPrice());
        job.setTypePrice(jobDTO.getTypePrice());
        job.setStatus(jobDTO.getStatus());
        job.setClient(client);
        job.setCategory(category);
        return Optional.of(jobMapper.toDto(jobRepository.save(job)));
    }

    @Override
    public Boolean deleteJob(Integer id) {
      Job job = jobRepository.findById(id).get();
      if (job != null) {
          jobRepository.delete(job);
          return true;
      }
      return false;
    }

    @Override
    public Optional<JobDTO> getJobById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<JobNameCategoryAndClientDTO> getJobsNameCategoryAndClient() {
        return jobRepository.findAll().stream()
                .map(jobNameCategoryAndClientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobNameCategoryAndClientDTO getJobNameCategoryAndClientById(Integer id) {
        return jobRepository.findById(id).map(jobNameCategoryAndClientMapper::toDto).orElse(null);
    }


    @Transactional
    @Override
    public JobDTO changeStatus(Integer id, JobDTO jobDTO) {
        // Kiểm tra xem jobDTO có giá trị status không
        if (jobDTO.getStatus() == null) {
            throw new IllegalArgumentException("Status cannot be null");
        }

        // Cập nhật trạng thái của Job dựa trên id
        jobRepository.changeStatus(id, jobDTO.getStatus());

        // Lấy lại Job sau khi cập nhật
        Job updatedJob = jobRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Job not found"));

        // Chuyển từ Job entity sang JobDTO và trả về
        return jobMapper.toDto(updatedJob);
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

    @Override
    public List<JobDTO> getJobs() {
        return jobRepository.findAll().stream().map(JobMapper.INSTANCE::toDto).toList();
    }

}
