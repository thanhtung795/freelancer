package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.dto.JobsOfFreelancerByIdAndStatusDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.FreelancerJob;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.StatusFreelancerJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface JobsOfFreelancerByIdAndStatusMapper {

    JobsOfFreelancerByIdAndStatusMapper INSTANCE = Mappers.getMapper(JobsOfFreelancerByIdAndStatusMapper.class);

    @Mapping(source = "id", target = "freelancerId")
    @Mapping(target = "status", expression = "java(mapStatus(freelancer))")
    @Mapping(target = "jobs", expression = "java(mapJobs(freelancer))")
    JobsOfFreelancerByIdAndStatusDTO toDto(Freelancer freelancer);



    // Nếu status nằm trong FreelancerJob, thêm phương thức này
    default StatusFreelancerJob mapStatus(Freelancer freelancer) {
        if (freelancer.getFreelancerJobs() == null || freelancer.getFreelancerJobs().isEmpty()) {
            return null;
        }
        return freelancer.getFreelancerJobs().get(0).getStatus();
    }
    default List<JobDTO> mapJobs(Freelancer freelancer) {
        if (freelancer.getFreelancerJobs() == null) {
            return null;
        }
        return freelancer.getFreelancerJobs().stream()
                .map(FreelancerJob::getJob)
                .map(this::jobToJobDTO)
                .collect(Collectors.toList());
    }

    @Mapping(source = "dateStart", target = "dateStart")
    @Mapping(source = "dateEnd", target = "dateEnd")
    @Mapping(source = "createdAt", target = "dateCreate")
    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "category.id", target = "categoryId")
    JobDTO jobToJobDTO(Job job);

}
