package org.example.freelancer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "skill")
public class Skill {
    @Id
    @Column(name = "skillID", nullable = false)
    private Integer id;

    @Column(name = "skillName", nullable = false)
    private String skillName;

}