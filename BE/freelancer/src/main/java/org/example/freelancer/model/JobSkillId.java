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
public class JobSkillId implements java.io.Serializable {
    private static final long serialVersionUID = -8873356003136703656L;
    @Column(name = "jobID", nullable = false)
    private Integer jobID;

    @Column(name = "skillID", nullable = false)
    private Integer skillID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        JobSkillId entity = (JobSkillId) o;
        return Objects.equals(this.jobID, entity.jobID) &&
                Objects.equals(this.skillID, entity.skillID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobID, skillID);
    }

}