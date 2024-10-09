package org.example.freelancer.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EduInfoFreelancerDTO {
    private Integer educationId;
    private String schoolName;
    private Date dateStart;
    private Date dateEnd;
    private String description;
    private String mojorName;
    private String degreeName;
}
