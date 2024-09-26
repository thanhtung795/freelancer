package org.example.freelancer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ClientDTO {
    private Integer id;

    private BigDecimal fromPrice;

    private BigDecimal toPrice;

    @NotNull
    private String typePrice;

    private Integer userId;
}
