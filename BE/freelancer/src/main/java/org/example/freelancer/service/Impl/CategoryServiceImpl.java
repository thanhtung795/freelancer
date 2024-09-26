package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.CategoryDTO;
import org.example.freelancer.mapper.CategoryMapper;
import org.example.freelancer.repository.CategoryRepository;
import org.example.freelancer.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO findById(Integer id) {
        // Tìm category theo ID, trả về DTO hoặc null nếu không tồn tại
        return categoryRepository.findById(id).map(categoryMapper::toDto).orElse(null);
    }

    @Override
    public List<CategoryDTO> findAll() {
        // Tìm tất cả các category và chuyển đổi sang DTO
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        // Tạo category mới bằng cách chuyển đổi DTO sang entity rồi lưu và trả về DTO
        return categoryMapper.toDto(categoryRepository.save(categoryMapper.toEntity(categoryDTO)));
    }

    @Override
    public CategoryDTO update(Integer id, CategoryDTO categoryDTO) {
        return categoryRepository.findById(id).map(category -> {
            category.setCategoryTitle(categoryDTO.getCategoryTitle());  // Cập nhật thuộc tính từ DTO
            categoryRepository.save(category);  // Lưu thay đổi
            return categoryMapper.toDto(category);  // Trả về DTO của đối tượng đã cập nhật
        }).orElse(null);  // Nếu không tìm thấy ID, trả về null
    }


    @Override
    public void delete(Integer id) {
        // Kiểm tra nếu category tồn tại thì xóa
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        }
    }
}
