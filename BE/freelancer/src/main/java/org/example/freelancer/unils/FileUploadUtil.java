package org.example.freelancer.unils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileUploadUtil {

    private static final String UPLOAD_DIR = "./uploads/images/"; // Thư mục mặc định để lưu trữ file

    /**
     * Lưu tệp được upload với tên file truyền vào.
     *
     * @param fileName    Tên của tệp.
     * @param multipartFile Đối tượng MultipartFile chứa tệp được upload.
     * @throws IOException Nếu có lỗi khi lưu tệp.
     */
    public static void saveFile(String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);

        // Tạo thư mục nếu chưa tồn tại
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try {
            // Lưu tệp vào thư mục đã chọn
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File đã được lưu tại: " + filePath.toAbsolutePath());
        } catch (IOException e) {
            throw new IOException("Không thể lưu tệp: " + fileName, e);
        }
    }
}
