package org.example.freelancer.service;

import org.example.freelancer.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO findById(Integer id);

    List<CategoryDTO> findAll();

    CategoryDTO create(CategoryDTO categoryDTO);

    CategoryDTO update(Integer id, CategoryDTO categoryDTO);

    void delete(Integer id);
}
