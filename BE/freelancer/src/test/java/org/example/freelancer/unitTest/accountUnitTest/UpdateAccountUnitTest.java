package org.example.freelancer.unitTest.accountUnitTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.freelancer.controller.AccountController;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.RegisterDTO;
import org.example.freelancer.exception.BadRequestException;
import org.example.freelancer.exception.GlobalExceptionHandler;
import org.example.freelancer.service.AccountService;
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

public class UpdateAccountUnitTest {
    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private AccountController accountController;

    @Mock
    private AccountService accountService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @Test
    public void testCreateDevice_success() throws Exception {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setEmail("testEmail");
        accountDTO.setRole("testRole");
        accountDTO.setStatus(true);
        accountDTO.setPassword("testPassword");
        accountDTO.setId(1);

        Mockito.when(accountService.updateAccount(1, accountDTO)).thenReturn(accountDTO);

        mockMvc = MockMvcBuilders.standaloneSetup(accountController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String accountDTOJson = objectMapper.writeValueAsString(accountDTO);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/auth/accounts/"+accountDTO.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(accountDTOJson)) // Add the content here
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("testEmail"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("testRole"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("testPassword"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andDo(MockMvcResultHandlers.print());
    }
}
