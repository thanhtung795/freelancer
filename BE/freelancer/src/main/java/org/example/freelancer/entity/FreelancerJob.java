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

    @MapsId("freelancerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "freelancer_id", nullable = false)
    private Freelancer freelancer;

    @MapsId("jobId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ColumnDefault("0")
    @Column(name = "is_selected")
    private Boolean isSelected;

    @Column(name = "status")
    private Boolean status;

}