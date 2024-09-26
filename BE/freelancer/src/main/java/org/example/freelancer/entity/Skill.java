package org.example.freelancer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "skill")
public class Skill {
    @Id
    @Column(name = "skill_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Hoặc GenerationType.AUTO
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "skill_name", nullable = false)
    private String skillName;

}