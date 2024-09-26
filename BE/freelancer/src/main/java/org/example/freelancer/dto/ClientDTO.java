package org.example.freelancer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Getter
@Setter
public class ClientDTO {
    private Integer id;

    @NotNull(message = "Giá từ không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá từ phải lớn hơn 0")
    private BigDecimal fromPrice;

    @NotNull(message = "Giá đến không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá đến phải lớn hơn 0")
    private BigDecimal toPrice;

    @NotBlank(message = "Loại giá không được để trống")
    private String typePrice;

    private Integer userId;
}
