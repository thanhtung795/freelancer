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
public class EducationId implements java.io.Serializable {
    private static final long serialVersionUID = 2891705544307528262L;
    @NotNull
    @Column(name = "freelancer_id", nullable = false)
    private Integer freelancerId;

    @NotNull
    @Column(name = "school_id", nullable = false)
    private Integer schoolId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EducationId entity = (EducationId) o;
        return Objects.equals(this.freelancerId, entity.freelancerId) &&
                Objects.equals(this.schoolId, entity.schoolId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(freelancerId, schoolId);
    }

}