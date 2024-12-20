package org.example.freelancer.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.freelancer.entity.StatusFreelancerJob;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerJobDTO {

    @NotNull(message = "Freelancer ID không được để trống")
    private Integer freelancerID;

    @NotNull(message = "Job ID không được để trống")
    private Integer jobID;

    private Boolean isSelected = false;

    private StatusFreelancerJob status;


}
