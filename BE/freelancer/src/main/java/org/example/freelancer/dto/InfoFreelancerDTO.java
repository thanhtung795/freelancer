package org.example.freelancer.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class InfoFreelancerDTO {
    private Integer freelancerId;
    private String firstName;
    private String lastName;
    private String address;
    private String image;
    private Integer categoryId;
    private String categoryTitle;
    private List<SkillDTO> skills; // Danh sách kỹ năng
    private List<EduInfoFreelancerDTO> eduInfoFreelancerDTOList; // Danh sách thông tin giáo dục
}
