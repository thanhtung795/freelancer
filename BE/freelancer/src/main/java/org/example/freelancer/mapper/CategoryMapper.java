package org.example.freelancer.mapper;

import org.example.freelancer.dto.CategoryDTO;
import org.example.freelancer.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDTO toDto(Category category);

    Category toEntity(CategoryDTO categoryDTO);
}
