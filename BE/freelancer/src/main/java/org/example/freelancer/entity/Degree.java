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
@Table(name = "degree")
public class Degree {
    @Id
    @Column(name = "degreeID", nullable = false)
    private Integer id;

    @Column(name = "degreeTitle", nullable = false)
    private String degreeTitle;

}