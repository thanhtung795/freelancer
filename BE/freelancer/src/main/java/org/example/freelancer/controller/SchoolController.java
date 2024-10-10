package org.example.freelancer.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.SchoolDTO;
import org.example.freelancer.service.SchoolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/school")
public class SchoolController {
    private final SchoolService schoolService;

    @GetMapping
    public ResponseEntity<?>getAllSchools(){
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", schoolService.getAllSchools());
            response.put("message", "Đã lấy toàn bộ danh sách trường");
        }catch (Exception e){
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể lấy toàn bộ danh sách trường");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> createSchool(@Valid @RequestBody SchoolDTO schoolDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", schoolService.addSchool(schoolDTO));
            response.put("message", "Đã tạo trường");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể tạo trường");
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchool(@PathVariable Integer id, @Valid @RequestBody SchoolDTO schoolDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", schoolService.updateSchool(id, schoolDTO));
            response.put("message", "Đã cập nhật trường");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể cập nhật trường");
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchool(@PathVariable Integer id) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", schoolService.deleteSchool(id));
            response.put("message", "Đã xóa trường");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể xóa trường");
        }
        return ResponseEntity.ok(response);
    }
}
