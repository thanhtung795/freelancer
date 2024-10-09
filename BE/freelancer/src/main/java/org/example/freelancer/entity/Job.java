package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "job")
public class Job {
    @Id
    @Column(name = "job_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "scope")
    private String scope;

    @Column(name = "hour_work", precision = 10, scale = 2)
    private BigDecimal hourWork;

    @Column(name = "job_opportunity")
    private Boolean jobOpportunity;

    @Column(name = "from_price", precision = 10, scale = 2)
    private BigDecimal fromPrice;

    @Column(name = "to_price", precision = 10, scale = 2)
    private BigDecimal toPrice;

    @Lob
    @Column(name = "type_price")
    private String typePrice;

    @Enumerated(EnumType.STRING) // Sử dụng kiểu chuỗi cho enum
    @Column(name = "status")
    private StatusJob status; // Trường status sẽ lưu enum

    @Column(name = "Date_start")
    @CreationTimestamp
    private LocalDateTime dateStart;

    @Column(name = "Date_end")
    @CreationTimestamp
    private LocalDateTime dateEnd;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @JsonIgnore

    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore

    private List<FreelancerJob> freelancerJobs = new ArrayList<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<JobSkill> jobSkills = new ArrayList<>();

}