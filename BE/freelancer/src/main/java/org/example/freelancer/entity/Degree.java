package org.example.freelancer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "degree")
public class Degree {
    @Id
    @Column(name = "degree_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "degree_title", nullable = false)
    private String degreeTitle;

}