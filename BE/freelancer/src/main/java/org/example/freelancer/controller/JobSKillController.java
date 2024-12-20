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

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

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
//    @PutMapping()
//    public ResponseEntity<?> updateJobSkill(@Validated @RequestBody JobSkillDTO jobSkillDTO) {
//        Map<String, Object> response = new LinkedHashMap<>();
//        try {
//            response.put("success", true);
//            response.put("data", JobSkillService.addJobSkill(jobSkillDTO));
//            response.put("message", "Đã cập nhật Job skill");
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("data", null);
//            response.put("message", "Không thể cập nhật Job skill: " + e.getMessage());
//        }
//        return ResponseEntity.ok(response);
//    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteJobSkill(@PathVariable Integer id) {
//        Map<String, Object> response = new LinkedHashMap<>();
//        try {
//            response.put("success", true);
//            response.put("data", JobSkillService.deleteJobSkill(id));
//            response.put("message", "Đã xóa Job skill");
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("data", null);
//            response.put("message", "Không thể xóa Job skill: " + e.getMessage());
//        }
//        return ResponseEntity.ok(response);
//    }
}
