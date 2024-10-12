package org.example.freelancer.controller;


import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.FreelancerSkillDTO;
import org.example.freelancer.service.FreelancerSkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/freelancerSkill")
@Validated
@RequiredArgsConstructor
public class FreelancerSkillController {

    private final FreelancerSkillService freelancerSkillService;

    @GetMapping
    public ResponseEntity<?> getAllFreelancerSkills() {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerSkillService.getAllFreelancerSkills());
            response.put("message","Đã lấy toàn bộ danh sach các job của freelancer");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy danh sách các job của freelancer");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> addFreelancerSkill(@Validated @RequestBody FreelancerSkillDTO dto) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerSkillService.addFreelancerSkill(dto));
            response.put("message","Đã thêm job của freelancer");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể thêm job của freelancer " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{idRole}")
    public ResponseEntity<?> deleteAllSkillsByRoleId(@PathVariable Integer idRole) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            freelancerSkillService.deleteAllSkillsByRoleId(idRole);
            response.put("success", true);
            response.put("message", "Đã xóa toàn bộ kỹ năng của freelancer với idRole " + idRole);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Không thể xóa các kỹ năng: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

}
