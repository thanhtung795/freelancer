package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.FreelancerJobDTO;
import org.example.freelancer.service.FreelancerJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/freelancerJobs")
public class FreelancerJobController {
    private final FreelancerJobService freelancerJobService;
    @GetMapping
    public ResponseEntity<?> getFreelancerJobs() {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerJobService.getAllFreelancerJob());
            response.put("message","Đã lấy toàn bộ danh sach các job của freelancer");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy danh sách các job của freelancer");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addFreelancerJob(@Validated @RequestBody FreelancerJobDTO dto) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerJobService.addFreelancerJob(dto));
            response.put("message", "Đã thêm job");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể thêm job: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping
    public ResponseEntity<?> updateFreelancerJob(@Validated @RequestBody FreelancerJobDTO dto) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerJobService.addFreelancerJob(dto));
            response.put("message", "Đã cặp nhật freelancer job thanh công");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể cặp nhật freelancer job: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

}
