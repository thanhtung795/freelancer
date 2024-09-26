package org.example.freelancer.mapper;

import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.User; // Đảm bảo import User
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface FreelancerMapper {

    FreelancerMapper INSTANCE = Mappers.getMapper(FreelancerMapper.class);

    @Mapping(target = "category.id", source = "categoryId") // Sử dụng category thay vì categoryID
    @Mapping(target = "user", source = "userID") // Cập nhật user
    Freelancer toEntity(FreelancerDTO dto);

    @Mapping(target = "categoryId", source = "category.id") // Sử dụng category thay vì categoryID
    @Mapping(target = "userID", source = "user.id") // Cập nhật user
    FreelancerDTO toDTO(Freelancer entity);

    default User map(Integer userId) {
        if (userId == null) {
            return null;
        }
        User user = new User();
        user.setId(userId); // Đảm bảo User có phương thức setId
        return user;
    }

    void updateFromDto(FreelancerDTO freelancerDTO, @MappingTarget Freelancer freelancer);
}
