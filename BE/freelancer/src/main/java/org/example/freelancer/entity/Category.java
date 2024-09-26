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
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "category_title", nullable = false, length = 100)
    private String categoryTitle;

}