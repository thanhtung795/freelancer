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

    private final FileUploadUtil  fileUploadUtil;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        Map<String, Object> response = new LinkedHashMap<>();
        if (file.isEmpty()) {
            response.put("success", false);
            response.put("message", "File is empty");
            return ResponseEntity.badRequest().body(response);
        } else {
            try {
                String fileName = file.getOriginalFilename();
                fileUploadUtil.saveFile(fileName, file, "image");
                response.put("message", "Uploaded the file successfully: " + fileName);
                return ResponseEntity.status(200).body(response);
            } catch (Exception e) {
                response.put("message", "Could not upload the file: " + file.getOriginalFilename() + "!");
                return ResponseEntity.status(500).body(response);
            }
        }
    }
}
