package org.example.freelancer.controller;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AccountDTO accountDTO) {
        try {
            accountService.createAccount(accountDTO);
            return ResponseEntity.ok("Account created successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
