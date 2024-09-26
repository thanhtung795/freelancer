package org.example.freelancer.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class JobDTO {
    @NotNull
    private Integer id;

    @NotNull
    @Size(max = 255)
    private String title;

    @Size(max = 65535) // Đối với Lob, bạn có thể tùy chỉnh kích thước nếu cần
    private String scope;

    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "9999999999.99")
    private BigDecimal hourWork;

    @NotNull
    private Boolean jobOpportunity;

    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "9999999999.99")
    private BigDecimal fromPrice;

    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "9999999999.99")
    private BigDecimal toPrice;

    @Size(max = 65535) // Nếu là dạng văn bản lớn
    private String typePrice;

    @NotNull
    private Boolean status;

    @NotNull
    private Integer clientId;

    @NotNull
    private Integer categoryId;
}
