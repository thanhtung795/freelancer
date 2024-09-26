package org.example.freelancer.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.entity.User;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Getter
@Setter
public class ClientDTO {
    private Integer id;

    @NotNull(message = "From price cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "From price must be greater than zero")
    private BigDecimal fromPrice;

    @NotNull(message = "To price cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "To price must be greater than zero")
    private BigDecimal toPrice;

    @NotBlank(message = "Type price cannot be empty")
    private String typePrice;

    private UserDTO user;
}
