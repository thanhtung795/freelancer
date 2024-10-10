package org.example.freelancer.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.entity.StatusJob;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class JobDTO {


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


    private String description;
    @NotNull
    private StatusJob status;

    private LocalDateTime dateStart;

    private LocalDateTime dateEnd;

    private LocalDateTime dateCreate;

    @NotNull
    private Integer clientId;

    @NotNull
    private Integer categoryId;
}
