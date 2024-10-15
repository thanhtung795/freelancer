package org.example.freelancer.unitTest.jobUnitTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.freelancer.controller.AccountController;
import org.example.freelancer.controller.JobController;
import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.StatusJob;
import org.example.freelancer.exception.GlobalExceptionHandler;
import org.example.freelancer.service.AccountService;
import org.example.freelancer.service.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreateJobUnitTest {
    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private JobController jobController;

    @Mock
    private JobService jobService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(jobController).build();
    }

    @Test
    public void testCreateJob_success() throws Exception {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(1);
        jobDTO.setTitle("Test Job");
        jobDTO.setScope("This is a test job scope");
        jobDTO.setHourWork(new BigDecimal("100"));
        jobDTO.setJobOpportunity(true);
        jobDTO.setFromPrice(new BigDecimal("1000"));
        jobDTO.setToPrice(new BigDecimal("5000"));
        jobDTO.setTypePrice("Fixed");
        jobDTO.setDescription("This is a test job description");
        jobDTO.setStatus(StatusJob.InProgress);
        jobDTO.setDateStart(LocalDateTime.now());
        jobDTO.setDateEnd(LocalDateTime.now().plusDays(10));
        jobDTO.setDateCreate(LocalDateTime.now());
        jobDTO.setClientId(1);
        jobDTO.setCategoryId(1);

        // Giả lập hành vi của service khi gọi phương thức addJob
        Mockito.when(jobService.addJob(Mockito.any(JobDTO.class))).thenReturn(jobDTO);

        mockMvc = MockMvcBuilders.standaloneSetup(jobController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // Để xử lý LocalDateTime
        String jobDTOJson = objectMapper.writeValueAsString(jobDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/Jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobDTOJson)) // Truyền dữ liệu vào đây
                .andExpect(MockMvcResultMatchers.status().isOk()) // Kiểm tra status 200
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đã tạo job"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.title").value("Test Job"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.scope").value("This is a test job scope"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.hourWork").value(100))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.fromPrice").value(1000))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.toPrice").value(5000))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.typePrice").value("Fixed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.description").value("This is a test job description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.clientId").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.categoryId").value(1))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void testCreateJob_failure() throws Exception {
        // Giả lập một JobDTO để test
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(1);
        jobDTO.setTitle("Test Job");
        jobDTO.setScope("This is a test job scope");
        jobDTO.setHourWork(new BigDecimal("100"));
        jobDTO.setJobOpportunity(true);
        jobDTO.setFromPrice(new BigDecimal("1000"));
        jobDTO.setToPrice(new BigDecimal("5000"));
        jobDTO.setTypePrice("Fixed");
        jobDTO.setDescription("This is a test job description");
        jobDTO.setStatus(StatusJob.InProgress);
        jobDTO.setDateStart(LocalDateTime.now());
        jobDTO.setDateEnd(LocalDateTime.now().plusDays(10));
        jobDTO.setDateCreate(LocalDateTime.now());
        jobDTO.setClientId(1);
        jobDTO.setCategoryId(1);

        // Giả lập hành vi của jobService để ném ra ngoại lệ
        Mockito.when(jobService.addJob(Mockito.any(JobDTO.class)))
                .thenThrow(new RuntimeException("Không thể tạo job, có lỗi xảy ra"));

        // Cấu hình mockMvc
        mockMvc = MockMvcBuilders.standaloneSetup(jobController)
                .setControllerAdvice(new GlobalExceptionHandler()) // Xử lý ngoại lệ chung
                .build();

        // Chuyển JobDTO thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // Để xử lý LocalDateTime
        String jobDTOJson = objectMapper.writeValueAsString(jobDTO);

        // Gửi request POST để tạo job
        mockMvc.perform(MockMvcRequestBuilders.post("/api/Jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobDTOJson)) // Truyền dữ liệu vào đây
                .andExpect(MockMvcResultMatchers.status().isOk()) // API trả về status 200 nhưng báo lỗi bên trong
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(false)) // Đảm bảo response có success = false
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Không thể tạo job, có lỗi xảy ra")) // Kiểm tra thông báo lỗi
                .andExpect(MockMvcResultMatchers.jsonPath("$.data").doesNotExist()) // Kiểm tra không có dữ liệu trả về
                .andDo(MockMvcResultHandlers.print()); // In ra response
    }

}
