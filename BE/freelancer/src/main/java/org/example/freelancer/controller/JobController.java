package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/Jobs")
public class JobController {
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<?> getJobs() {

        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",jobService.getJobs() );
            response.put("message","Đã lấy toàn bộ danh sach các job ");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể lấy danh sách các job ");
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<?> createJob(@Validated @RequestBody JobDTO jobDTO) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",jobService.addJob(jobDTO));
            response.put("message","Đã tạo job ");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể tạo job và xây ra lỗi : "+e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Integer id, @Validated @RequestBody JobDTO jobDTO) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",jobService.updateJob(id,jobDTO));
            response.put("message","Đã cập nhật job thành công");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể cập nhật job và xây ra lỗi : "+e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Integer id) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",jobService.deleteJob(id));
            response.put("message","Đã xóa job ");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể xóa job và xây ra lỗi : "+e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/changeStatus/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable Integer id, @RequestBody JobDTO jobDTO) {
        Map<String, Object> response =new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data",jobService.changeStatus(id,jobDTO));
            response.put("message","Đã thay đổi trảng thái job ");
        }catch (Exception e){
            response.put("success", false);
            response.put("data",null);
            response.put("message","Không thể thay đổi trảng thái job và xây ra lỗi : "+e.getMessage());
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getAllJobName")
    public ResponseEntity<?> getAllJobName() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            response.put("success", true);
            response.put("data", jobService.getJobsNameCategoryAndClient());
            response.put("message", "Đã lấy toàn bộ danh sach job ");
        } catch (Exception e) {
            response.put("success", false);
            response.put("data", null);
            response.put("message", "Không thể lấy danh sách job ");
        }
        return ResponseEntity.ok(response);
    }
}
