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
@Table(name = "school")
public class School {
    @Id
    @Column(name = "schoolID", nullable = false)
    private Integer id;

    @Column(name = "schoolName", nullable = false)
    private String schoolName;

}