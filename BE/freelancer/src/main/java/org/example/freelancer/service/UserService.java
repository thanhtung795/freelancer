package org.example.freelancer.service;
import org.example.freelancer.dto.InfoFreelancerDTO;
import org.example.freelancer.dto.UserDTO;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO createUser(UserDTO userDTO);
    Optional<UserDTO> getUserById(Integer id);
    UserDTO updateUser(Integer id, UserDTO userDTO);
    void deleteUser(Integer id);
    List<InfoFreelancerDTO> findAllFreelancers();
}