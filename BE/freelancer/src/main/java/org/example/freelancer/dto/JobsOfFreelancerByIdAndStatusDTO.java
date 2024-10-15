package org.example.freelancer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.entity.StatusFreelancerJob;

import java.util.List;

@Getter
@Setter
@Builder
public class JobsOfFreelancerByIdAndStatusDTO {
    private Integer freelancerId;
    private StatusFreelancerJob status;
    private List<JobDTO> jobs;
}
