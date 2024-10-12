package org.example.freelancer.mapper;

import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.dto.FreelancerJobDTO;
import org.example.freelancer.entity.FreelancerJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FreelancerJobMapper {

    FreelancerJobMapper INSTANCE = Mappers.getMapper(FreelancerJobMapper.class);

    // Mapping từ thực thể FreelancerJob sang DTO
    @Mapping(target = "freelancerID", source = "id.freelancerId") // Lấy freelancerID từ đối tượng FreelancerJobId
    @Mapping(target = "jobID", source = "id.jobId") // Lấy jobID từ đối tượng FreelancerJobId
    @Mapping(target = "status", source = "status")
    FreelancerJobDTO toDTO(FreelancerJob entity);

    // Mapping từ DTO sang thực thể FreelancerJob
    @Mapping(target = "id.freelancerId", source = "freelancerID") // Thiết lập freelancerID cho đối tượng Freelancer
    @Mapping(target = "id.jobId", source = "jobID") // Thiết lập jobID cho khóa chính tổng hợp
    @Mapping(target = "status", source = "status")
    FreelancerJob toEntity(FreelancerJobDTO dto);
}
