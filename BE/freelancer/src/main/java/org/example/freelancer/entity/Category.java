package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryID", nullable = false)
    private Integer id;

    @Column(name = "categoryTitle", nullable = false, length = 100)
    private String categoryTitle;

}