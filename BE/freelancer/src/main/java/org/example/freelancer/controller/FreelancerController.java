package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.example.freelancer.service.FreelancerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
