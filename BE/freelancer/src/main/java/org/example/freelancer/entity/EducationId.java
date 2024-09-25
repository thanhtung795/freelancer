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
public class EducationId implements java.io.Serializable {
    private static final long serialVersionUID = -6074262139566181220L;
    @Column(name = "freelancerID", nullable = false)
    private Integer freelancerID;

    @Column(name = "schoolID", nullable = false)
    private Integer schoolID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EducationId entity = (EducationId) o;
        return Objects.equals(this.freelancerID, entity.freelancerID) &&
                Objects.equals(this.schoolID, entity.schoolID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(freelancerID, schoolID);
    }

}