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

    @Mapping(target = "categoryID.id", source = "categoryId")
    @Mapping(target = "userID", source = "userID") // Thêm ánh xạ cho userID
    Freelancer toEntity(FreelancerDTO dto);

    @Mapping(target = "categoryId", source = "categoryID.id")
    @Mapping(target = "userID", source = "userID.id") // Chuyển userID từ thực thể về DTO
    FreelancerDTO toDTO(Freelancer entity);

    // Thêm phương thức ánh xạ từ Integer sang User
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
