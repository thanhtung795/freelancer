package org.example.freelancer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
public class FreelancerJobId implements java.io.Serializable {
    private static final long serialVersionUID = -3717258594741069169L;
    @Column(name = "freelancerID", nullable = false)
    private Integer freelancerID;

    @Column(name = "jobID", nullable = false)
    private Integer jobID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FreelancerJobId entity = (FreelancerJobId) o;
        return Objects.equals(this.jobID, entity.jobID) &&
                Objects.equals(this.freelancerID, entity.freelancerID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobID, freelancerID);
    }

}