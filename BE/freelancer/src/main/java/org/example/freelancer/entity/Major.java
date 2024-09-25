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
@Table(name = "major")
public class Major {
    @Id
    @Column(name = "majorID", nullable = false)
    private Integer id;

    @Column(name = "majorName", nullable = false)
    private String majorName;

}