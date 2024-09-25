package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "freelancer")
public class Freelancer {
    @Id
    @Column(name = "freelancerID", nullable = false)
    private Integer id;

    @Column(name = "image")
    private String image;

    @Column(name = "hourlyRate", precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryID")
    private Category categoryID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User userID;

}