package org.example.freelancer.controller;

import org.example.freelancer.dto.MajorDTO;
import org.example.freelancer.service.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/majors")
public class MajorController {

    @Autowired
    private MajorService majorService;

    // Lấy tất cả majors
    @GetMapping
    public List<MajorDTO> getAllMajors() {
        return majorService.getAllMajors();
    }

    // Lấy major theo id
    @GetMapping("/{id}")
    public ResponseEntity<MajorDTO> getMajorById(@PathVariable Integer id) {
        Optional<MajorDTO> majorDTO = majorService.getMajorById(id);
        return majorDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới major
    @PostMapping
    public ResponseEntity<MajorDTO> createMajor(@RequestBody MajorDTO majorDTO) {
        return ResponseEntity.ok(majorService.createMajor(majorDTO));
    }

    // Cập nhật major theo id
    @PutMapping("/{id}")
    public ResponseEntity<MajorDTO> updateMajor(@PathVariable Integer id, @RequestBody MajorDTO majorDetails) {
        MajorDTO updatedMajor = majorService.updateMajor(id, majorDetails);
        if (updatedMajor != null) {
            return ResponseEntity.ok(updatedMajor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa major theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMajor(@PathVariable Integer id) {
        if (majorService.deleteMajor(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
