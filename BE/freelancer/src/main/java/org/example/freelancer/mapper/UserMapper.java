package org.example.freelancer.mapper;

import org.example.freelancer.dto.UserDTO;
import org.example.freelancer.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "account.id", target = "accountId")
    UserDTO userToUserDTO(User user);

    @Mapping(source = "accountId", target = "account.id")
    User userDTOToUser(UserDTO userDTO);
}

