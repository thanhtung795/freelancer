package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.example.freelancer.dto.CountResultDTO;
import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.service.FreelancerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/freelancers")
public class FreelancerController {

    private final FreelancerService freelancerService;

    @GetMapping
    public ResponseEntity<?> getFreelancers() {
        Map<String, Object> response =new HashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerService.getAllFreelancer());
            response.put("message","Đã lấy toàn bộ danh sach freelancer");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy danh sách freelancer");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> addFreelancer(@Validated @RequestBody FreelancerDTO freelancerDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", freelancerService.addFreelancer(freelancerDTO));
            response.put("message", "Đã thêm freelancer");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể thêm freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFreelancer(@PathVariable Integer id, @RequestBody FreelancerDTO freelancerDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", freelancerService.updateFreelancer(id, freelancerDTO));
            response.put("message", "Đã cặp nhặt freelancer");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể Cặp nhặt freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFreelancer(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerService.deleteFreelancer(id));
            response.put("message", "Đã xoá freelancer");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể xoá freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/countFreelancersAndClient")
    public ResponseEntity<?> countFreelancersAndClient() {
        CountResultDTO countResult = freelancerService.countFreelancersAndClientsDTO();
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", Arrays.asList(countResult));
            response.put("message", "Đ Accessed to count Freelancers And Client");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Khong Accessed to count Freelancers And Client: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
}
