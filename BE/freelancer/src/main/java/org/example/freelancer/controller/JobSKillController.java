package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobSkillDTO;
import org.example.freelancer.service.JobSkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/jobskills")
public class JobSKillController {

    private final JobSkillService JobSkillService;

    @GetMapping
    public ResponseEntity<?> getAllJobSkills() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", JobSkillService.getAllJobSkills());
            response.put("message", "Đã lấy toàn bộ danh sach Job skill");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể lấy danh sách Job skill");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> addJobSkill(@Validated @RequestBody JobSkillDTO jobSkillDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", JobSkillService.addJobSkill(jobSkillDTO));
            response.put("message", "Đã thêm Job skill");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể thêm Job skill: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
}
