package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.example.freelancer.dto.CountResultDTO;
import org.example.freelancer.dto.FreelancerDTO;
import org.example.freelancer.service.FreelancerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/freelancers")
public class FreelancerController {

    private final FreelancerService freelancerService;

    @GetMapping("/freelancerApply/{id}")
    public ResponseEntity<?> getFreelancerApply(@PathVariable Integer id) {
     Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerService.findAllByJobId(id));  
            response.put("message","Đã lấy freelancer apply");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy freelancer apply : "+e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
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
            // Gọi service để thêm freelancer
            FreelancerDTO addedFreelancer = freelancerService.addFreelancer(freelancerDTO);
            response.put("success", true);
            response.put("data", addedFreelancer);
            response.put("message", "Đã thêm freelancer");
        } catch (Exception e) {
            // Xử lý các lỗi khác như lỗi cơ sở dữ liệu
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể thêm freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/update-image")
    public ResponseEntity<?> updateFreelancerImage(@PathVariable Integer id, @RequestParam("image") String imageUrl) {
        Map<String, Object> response = new HashMap<>();
        try {
            FreelancerDTO updatedFreelancer = freelancerService.updateFreelancerImage(id, imageUrl);
            response.put("success", true);
            response.put("data", updatedFreelancer);
            response.put("message", "Đã cập nhật hình ảnh freelancer thành công");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể cập nhật hình ảnh freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFreelancer(@PathVariable Integer id, @RequestBody FreelancerDTO freelancerDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", freelancerService.updateFreelancer(id, freelancerDTO));
            response.put("message", "Đã cặp nhặt freelancer");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể Cặp nhặt freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFreelancer(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data",freelancerService.deleteFreelancer(id));
            response.put("message", "Đã xoá freelancer");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể xoá freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/countFreelancersAndClient")
    public ResponseEntity<?> countFreelancersAndClient() {
        CountResultDTO countResult = freelancerService.countFreelancersAndClientsDTO();
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", Arrays.asList(countResult));
            response.put("message", "Đ Accessed to count Freelancers And Client");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Khong Accessed to count Freelancers And Client: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/update-category")
    public ResponseEntity<?> updateFreelancerCategory(@PathVariable Integer id, @RequestParam("categoryId") Integer categoryId) {
        Map<String, Object> response = new HashMap<>();
        try {
            FreelancerDTO updatedFreelancer = freelancerService.updateFreelancerCategory(id, categoryId);
            response.put("success", true);
            response.put("data", updatedFreelancer);
            response.put("message", "Đã cập nhật category của freelancer thành công");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể cập nhật category của freelancer: " + e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

}
