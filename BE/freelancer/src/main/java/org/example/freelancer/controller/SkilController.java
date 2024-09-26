package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.SkillDTO;
import org.example.freelancer.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/skills")
public class SkilController {
    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<?> getAllSkill() {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",skillService.getAllSkill());
            response.put("message","Đã lấy toàn bộ danh sach các job của freelancer");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy danh sách các job của freelancer");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addSkill(@Validated @RequestBody SkillDTO skillDTO) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",skillService.addSkillDto(skillDTO));
            response.put("message","Đã thêm 1 job mới");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể thêm 1 job" + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
}
