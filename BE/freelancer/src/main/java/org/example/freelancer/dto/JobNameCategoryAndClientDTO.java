package org.example.freelancer.dto;


import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.entity.StatusJob;


import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Setter
public class JobNameCategoryAndClientDTO {
    private Integer id;
    private String title;
    private String scope;
    private BigDecimal hourWork;
    private Boolean jobOpportunity;
    private BigDecimal fromPrice;
    private BigDecimal toPrice;
    private String typePrice;
    private StatusJob status;
    private LocalDateTime dateStart;

    private LocalDateTime dateEnd;

    private LocalDateTime dateCreate;

    private String clientName; // Tên client
    private String categoryName; // Tên category
}
