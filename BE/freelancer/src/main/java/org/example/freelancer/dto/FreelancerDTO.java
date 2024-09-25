package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerDTO {
    @NotNull(message = "ID không được để trống")
    private Integer id;

    private String image;

    @NotNull(message = "Hourly rate không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate phải lớn hơn 0")
    @Digits(integer = 10, fraction = 2, message = "Hourly rate không hợp lệ")
    private BigDecimal hourlyRate;

    @NotNull(message = "Category ID không được để trống")
    private Integer categoryId;

    @NotNull(message = "User ID không được để trống")
    private Integer userID;
}
