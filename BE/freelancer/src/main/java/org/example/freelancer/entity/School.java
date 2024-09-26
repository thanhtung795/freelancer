package org.example.freelancer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "school")
public class School {
    @Id
    @Column(name = "school_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "school_name", nullable = false)
    private String schoolName;

}