package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.dto.JobsOfFreelancerDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.StatusFreelancerJob;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {JobMapper.class})
public interface JobsOfFreelancerMapper {

    @Mapping(source = "id", target = "freelancerId")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.phoneNumber", target = "phoneNumber")
    @Mapping(source = "user.address", target = "address")
    @Mapping(source = "user.account.email", target = "email")
    @Mapping(source = "image", target = "image")
    @Mapping(source = "hourlyRate", target = "hourlyRate")
    // Nếu status nằm trong FreelancerJob, sử dụng expression
    @Mapping(target = "status", expression = "java(mapStatus(freelancer))")
    @Mapping(target = "jobs", expression = "java(mapJobs(freelancer))")
    JobsOfFreelancerDTO toDto(Freelancer freelancer);

    default List<JobDTO> mapJobs(Freelancer freelancer) {
        if (freelancer.getFreelancerJobs() == null) {
            return null;
        }
        return freelancer.getFreelancerJobs().stream()
                .map(FreelancerJob::getJob)
                .map(this::jobToJobDTO)
                .collect(Collectors.toList());
    }

    // Nếu status nằm trong FreelancerJob, thêm phương thức này
    default StatusFreelancerJob mapStatus(Freelancer freelancer) {
        if (freelancer.getFreelancerJobs() == null || freelancer.getFreelancerJobs().isEmpty()) {
            return null;
        }
        return freelancer.getFreelancerJobs().get(0).getStatus();
    }

    @Mapping(source = "dateStart", target = "dateStart")
    @Mapping(source = "dateEnd", target = "dateEnd")
    @Mapping(source = "createdAt", target = "dateCreate")
    JobDTO jobToJobDTO(Job job);
}