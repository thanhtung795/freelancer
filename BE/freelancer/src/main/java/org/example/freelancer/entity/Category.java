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
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "categoryID", nullable = false)
    private Integer id;

    @Column(name = "categoryTitle", nullable = false, length = 100)
    private String categoryTitle;

}