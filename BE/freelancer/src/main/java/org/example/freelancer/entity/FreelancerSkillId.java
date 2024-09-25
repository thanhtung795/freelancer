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
public class FreelancerSkillId implements java.io.Serializable {
    private static final long serialVersionUID = -4363509959468133274L;
    @Column(name = "freelancerID", nullable = false)
    private Integer freelancerID;

    @Column(name = "skillID", nullable = false)
    private Integer skillID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FreelancerSkillId entity = (FreelancerSkillId) o;
        return Objects.equals(this.skillID, entity.skillID) &&
                Objects.equals(this.freelancerID, entity.freelancerID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(skillID, freelancerID);
    }

}