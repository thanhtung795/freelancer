package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "job")
public class Job {
    @Id
    @Column(name = "jobID", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "scope")
    private String scope;

    @Column(name = "hourWork")
    private Integer hourWork;

    @Column(name = "jobOpportunity", length = 100)
    private String jobOpportunity;

    @Column(name = "fromPrice", precision = 10, scale = 2)
    private BigDecimal fromPrice;

    @Column(name = "toPrice", precision = 10, scale = 2)
    private BigDecimal toPrice;

    @Column(name = "typePayment", length = 50)
    private String typePayment;

    @Column(name = "status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientID")
    private Client clientID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryID")
    private Category categoryID;

}