package org.example.freelancer.unitTest.accountUnitTest;

import org.example.freelancer.controller.AccountController;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.service.AccountService;
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

import java.util.Optional;

public class GetAccountByIdUnitTest {
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
    public void testGetAccountById_success() throws Exception {
        AccountDTO accountDTO = new AccountDTO(1, "testEmail", "testRole", "testPassword", true);

        Mockito.when(accountService.getAccountById(1)).thenReturn(Optional.of(accountDTO));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/accounts/" + accountDTO.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("testEmail"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("testRole"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("testPassword"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void testGetAccountById_notFound() throws Exception {
        // Giả lập phương thức accountService.getAccountById trả về Optional.empty() khi không tìm thấy account
        Mockito.when(accountService.getAccountById(1)).thenReturn(Optional.empty());

        // Thực hiện yêu cầu GET và kiểm tra API trả về 404 Not Found
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/accounts/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound())  // Kiểm tra status 404
                .andDo(MockMvcResultHandlers.print());
    }

}
