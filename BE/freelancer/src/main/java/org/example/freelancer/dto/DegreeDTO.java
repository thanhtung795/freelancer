package org.example.freelancer.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DegreeDTO {
    @NotNull(message = "ID không được để trống")
    private Integer id;

    @Size(max = 255)
    @NotNull(message = "Tên bằng cấp không được để trống")
    private String degreeTitle;
}
