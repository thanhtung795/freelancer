package org.example.freelancer.unitTest.accountUnitTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.freelancer.controller.AccountController;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.RegisterDTO;
import org.example.freelancer.exception.BadRequestException;
import org.example.freelancer.exception.GlobalExceptionHandler;
import org.example.freelancer.service.RegisterService;
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

import java.util.ArrayList;
import java.util.List;

public class CreateAccountUnitTest {
    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private AccountController accountController;

    @Mock
    private RegisterService registerService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @Test
    public void testRegister_success() throws Exception {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setEmail("testEmail");
        registerDTO.setPassword("testPassword");
        registerDTO.setRole("testRole");
        registerDTO.setStatus(true);
        registerDTO.setFirstName("testFirstName");
        registerDTO.setLastName("testLastName");
        registerDTO.setPhoneNumber("testPhoneNumber");
        registerDTO.setAddress("testAddress");


        Mockito.when(registerService.registerAccount(Mockito.any(RegisterDTO.class))).thenReturn(registerDTO);

        mockMvc = MockMvcBuilders.standaloneSetup(accountController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String registerDTOJson = objectMapper.writeValueAsString(registerDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerDTOJson)) // Add the content here
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đăng kí thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.email").value("testEmail"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.role").value("testRole"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.status").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.firstName").value("testFirstName"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.lastName").value("testLastName"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.phoneNumber").value("testPhoneNumber"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.address").value("testAddress"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void testRegister_failure() throws Exception {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setEmail("testEmail");
        registerDTO.setPassword("testPassword");
        registerDTO.setRole("testRole");
        registerDTO.setStatus(true);
        registerDTO.setFirstName("testFirstName");
        registerDTO.setLastName("testLastName");
        registerDTO.setPhoneNumber("testPhoneNumber");
        registerDTO.setAddress("testAddress");

        Mockito.when(registerService.registerAccount(Mockito.any(RegisterDTO.class))).thenThrow(new BadRequestException("Account already exists"));

        mockMvc = MockMvcBuilders.standaloneSetup(accountController).setControllerAdvice(new GlobalExceptionHandler())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String registerDTOJson = objectMapper.writeValueAsString(registerDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerDTOJson)) // Add the content here
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đăng kí thất bại"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value(false))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data").doesNotExist())
                .andDo(MockMvcResultHandlers.print());
    }
}
