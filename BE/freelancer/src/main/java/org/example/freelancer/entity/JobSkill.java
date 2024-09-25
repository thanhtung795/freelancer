package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "job_skill")
public class JobSkill {
    @EmbeddedId
    private JobSkillId id;

    @MapsId("jobID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "jobID", nullable = false)
    private Job jobID;

    @MapsId("skillID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skillID", nullable = false)
    private Skill skillID;

}