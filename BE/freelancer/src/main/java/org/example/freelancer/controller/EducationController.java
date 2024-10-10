package org.example.freelancer.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.EducationDTO;
import org.example.freelancer.entity.Education;
import org.example.freelancer.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    public ResponseEntity<?> getEducation() {
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("status", 200);
            response.put("data", educationService.getEducations());
            response.put("message", "Đã lấy danh sách học vấn");
        } catch (Exception e) {
            response.put("success", false);
            response.put("status", 500);
            response.put("data", null);
            response.put("message", "Không thể lấy học vấn");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> addEducation(@RequestBody EducationDTO educationDTO) {
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("status", 200);
            response.put("data", educationService.addEducation(educationDTO));
            response.put("message", "Đã thêm học vấn");
        } catch (Exception e) {
            response.put("success", false);
            response.put("status", 500);
            response.put("data", null);
            response.put("message", "Không thể thêm học vấn");
        }
        return ResponseEntity.ok(response);
    }

}
