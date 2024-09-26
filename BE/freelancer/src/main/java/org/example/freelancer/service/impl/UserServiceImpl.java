package org.example.freelancer.service.impl;

import org.example.freelancer.dto.UserDTO;
import org.example.freelancer.mapper.UserMapper;
import org.example.freelancer.entity.User;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper.INSTANCE::userToUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.INSTANCE.userDTOToUser(userDTO);
        System.out.print("\"'vao duoc dy");
        System.out.println(user.toString());
        User savedUser = userRepository.save(user);
        return UserMapper.INSTANCE.userToUserDTO(savedUser);
    }

    @Override
    public Optional<UserDTO> getUserById(Integer id) {
        return userRepository.findById(id)
                .map(UserMapper.INSTANCE::userToUserDTO);
    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        // Nếu có một Account, có thể lấy từ ID và gán
        if(userDTO.getAccountId() != null) {
            user.setAccount(accountRepository.findById(userDTO.getAccountId()).orElse(null));
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.INSTANCE.userToUserDTO(updatedUser);
    }

    @Override
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found.");
        }
        userRepository.deleteById(id);
    }
}
