package org.example.freelancer.controller;

import org.example.freelancer.dto.InfoFreelancerDTO;
import org.example.freelancer.dto.UserDTO;
import org.example.freelancer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;  // Import @Valid

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @Valid @RequestBody UserDTO userDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            UserDTO updatedUser = userService.partialUpdateUser(id, userDTO);
            response.put("success", true);
            response.put("data", updatedUser);
            response.put("message", "Đã cập nhật người dùng");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể cập nhật người dùng: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAllInfoFreelancer")
    public ResponseEntity<?> getAllInfoFreelancers() {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            map.put("success", true);
            map.put("Status", 200);
            map.put("data", userService.findAllFreelancers());
            map.put("message", "Lấy dữ liệu thành công");
        } catch (RuntimeException e) {
            map.put("success", false);
            map.put("Status", 500);
            map.put("data", null);
            map.put("message", e.getMessage());
        }
        return ResponseEntity.ok(map);
    }
}
