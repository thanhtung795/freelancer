package org.example.freelancer.unitTest.accountUnitTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.freelancer.controller.AccountController;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.exception.GlobalExceptionHandler;
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

public class DeleteAccountUnitTest {
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
    public void testDeleteAccount_success() throws Exception {
        Integer accountId = 1;

        // Mockito mock the deleteAccount method to do nothing when called
        Mockito.doNothing().when(accountService).deleteAccount(accountId);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auth/accounts/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Account deleted successfully."))
                .andDo(MockMvcResultHandlers.print());

        // Verify that the accountService.deleteAccount() method was called once
        Mockito.verify(accountService, Mockito.times(1)).deleteAccount(accountId);
    }

    @Test
    public void testDeleteAccount_failure() throws Exception {
        Integer accountId = 1;

        // Mockito mock the deleteAccount method to throw a RuntimeException
        Mockito.doThrow(new RuntimeException("Account not found")).when(accountService).deleteAccount(accountId);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auth/accounts/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        // Verify that the accountService.deleteAccount() method was called once
        Mockito.verify(accountService, Mockito.times(1)).deleteAccount(accountId);
    }
}
