package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerDTO {

    private Integer id;

    private String image;

    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate phải lớn hơn 0")
    @Digits(integer = 10, fraction = 2, message = "Hourly rate không hợp lệ")
    private BigDecimal hourlyRate;

    @NotNull(message = "Category ID không được để trống")
    private Integer categoryId;

    @NotNull(message = "User ID không được để trống")
    private Integer userID;

    // Bổ sung các trường bị thiếu
    private List<FreelancerJobDTO> freelancerJobs;
    private List<FreelancerSkillDTO> freelancerSkills;
    private List<EducationDTO> educations;
}
