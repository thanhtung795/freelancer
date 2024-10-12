package org.example.freelancer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EducationDTO {

    @NotNull(message = "ID freelancer không được để trống")
    private Integer freelancerId;

    @NotNull(message = "ID trường không được để trống")
    private Integer schoolId;

    @NotNull(message = "ID chuyen nganh không là bắt buộc")
    private Integer majorId; // Có thể null nếu không bắt buộc

    @NotNull(message = "ID báo cáo này không là bắt buộc")
    private Integer degreeId; // Có thể null nếu không bắt buộc

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private Date dateStart;

    @NotNull(message = "Ngày kết thúc không được để trống")
    private Date dateEnd;

    private String description;
}
