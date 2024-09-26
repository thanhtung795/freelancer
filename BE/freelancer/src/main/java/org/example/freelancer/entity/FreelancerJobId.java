package org.example.freelancer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
public class FreelancerJobId implements java.io.Serializable {
    private static final long serialVersionUID = -2697195320083717426L;
    @NotNull
    @Column(name = "freelancer_id", nullable = false)
    private Integer freelancerId;

    @NotNull
    @Column(name = "job_id", nullable = false)
    private Integer jobId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FreelancerJobId entity = (FreelancerJobId) o;
        return Objects.equals(this.jobId, entity.jobId) &&
                Objects.equals(this.freelancerId, entity.freelancerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobId, freelancerId);
    }

}