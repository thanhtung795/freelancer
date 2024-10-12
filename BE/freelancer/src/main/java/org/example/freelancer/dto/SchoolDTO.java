package org.example.freelancer.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchoolDTO {
    private Integer id;

    @NotEmpty(message = "Tên trường không được bỏ trống")
    private String schoolName;

    // Nếu bạn muốn thêm danh sách các Education liên quan
    private List<EducationDTO> educations; // Bạn cần tạo một DTO cho Education nếu chưa có
}
