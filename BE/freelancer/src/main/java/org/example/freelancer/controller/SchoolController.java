package org.example.freelancer.controller;


import lombok.RequiredArgsConstructor;
import org.example.freelancer.service.SchoolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
