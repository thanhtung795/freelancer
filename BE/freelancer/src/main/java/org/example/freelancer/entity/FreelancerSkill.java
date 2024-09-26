package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "freelancer_skill")
public class FreelancerSkill {
    @EmbeddedId
    private FreelancerSkillId id;

    @MapsId("freelancerID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "freelancerID", nullable = false)
    private Freelancer freelancerID;

    @MapsId("skillID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skillID", nullable = false)
    private Skill skillID;

}