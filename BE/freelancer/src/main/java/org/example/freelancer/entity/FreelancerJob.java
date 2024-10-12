package org.example.freelancer.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.example.freelancer.entity.StatusFreelancerJob;

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
    @JsonIgnore
    private Freelancer freelancer;

    @MapsId("jobId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    @JsonIgnore
    private Job job;

    @ColumnDefault("0")
    @Column(name = "is_selected")
    private Boolean isSelected;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusFreelancerJob status;

}