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
public class FreelancerSkillId implements java.io.Serializable {
    private static final long serialVersionUID = 8011238937697505165L;
    @NotNull
    @Column(name = "freelancer_id", nullable = false)
    private Integer freelancerId;

    @NotNull
    @Column(name = "skill_id", nullable = false)
    private Integer skillId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FreelancerSkillId entity = (FreelancerSkillId) o;
        return Objects.equals(this.skillId, entity.skillId) &&
                Objects.equals(this.freelancerId, entity.freelancerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(skillId, freelancerId);
    }

}