package org.example.freelancer.service;
import org.example.freelancer.dto.UserDTO;
import org.example.freelancer.mapper.UserMapper;
import org.example.freelancer.entity.User;
import org.example.freelancer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface UserService {

    List<UserDTO> getAllUsers();

    UserDTO createUser(UserDTO userDTO);

    Optional<UserDTO> getUserById(Integer id);

    UserDTO updateUser(Integer id, UserDTO userDTO);

    void deleteUser(Integer id);
}