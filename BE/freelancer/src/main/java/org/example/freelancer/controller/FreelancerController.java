package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.service.FreelancerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

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
}
