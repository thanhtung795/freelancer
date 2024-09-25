package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "freelancer_job")
public class FreelancerJob {
    @EmbeddedId
    private FreelancerJobId id;

    @MapsId("freelancerID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "freelancerID", nullable = false)
    private Freelancer freelancerID;

    @MapsId("jobID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "jobID", nullable = false)
    private Job jobID;

    @ColumnDefault("0")
    @Column(name = "isSelected")
    private Boolean isSelected;

    @Column(name = "status", length = 50)
    private String status;

}