package org.example.freelancer.dto;


import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.entity.StatusJob;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class JobNameCategoryAndClientDTO {
    private Integer clientId;
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
    private LocalDateTime createdAt;
    private String firstName;
    private String lastName;
    private String categoryName; // Tên category
    private List<String> skills;
    private String description;

    private CompanyDTO company;

}

