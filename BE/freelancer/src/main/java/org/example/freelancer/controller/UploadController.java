package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.unils.FileUploadUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {

    private final FileUploadUtil fileUploadUtil;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new LinkedHashMap<>();
        if (file.isEmpty()) {
            response.put("success", false);
            response.put("message", "File is empty");
            return ResponseEntity.badRequest().body(response);
        } else {
            try {
                // Dùng tên file mà client gửi lên thay vì original filename
                String fileName = file.getOriginalFilename();
                FileUploadUtil.saveFile(fileName, file);  // Lưu tệp với tên mới

                // Trả về đường dẫn có thể truy cập ảnh
                String fileUrl = "http://localhost:8080/uploads/images/" + fileName;
                response.put("success", true);
                response.put("message", "Uploaded the file successfully: " + fileName);
                response.put("url", fileUrl);

                return ResponseEntity.ok(response);
            } catch (IOException e) {
                response.put("success", false);
                response.put("message", "Could not upload the file: " + file.getOriginalFilename() + "!");
                return ResponseEntity.status(500).body(response);
            }
        }
    }

}
