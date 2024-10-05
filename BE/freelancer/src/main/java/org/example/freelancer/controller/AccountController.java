package org.example.freelancer.controller;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        List<AccountDTO> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody AccountDTO accountDTO) {
        try {
            System.out.println(accountDTO);
            accountService.createAccount(accountDTO);
            return ResponseEntity.ok("Account created successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable Integer id) {
        return accountService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/accounts/{id}")
    public ResponseEntity<AccountDTO> updateAccount(@PathVariable Integer id, @Valid @RequestBody AccountDTO accountDTO) {
        try {
            AccountDTO updatedAccount = accountService.updateAccount(id, accountDTO);
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Integer id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.ok("Account deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/changeStatus/{id}") // Định nghĩa endpoint PUT
    public ResponseEntity<?> changeAccountStatus(
            @PathVariable Integer id, // Lấy id từ đường dẫn
            @RequestParam Boolean status) { // Lấy trạng thái từ query parameter
        if (accountService.changeAccountStatus(status, id)) {
            return ResponseEntity.ok("Trạng thái tài khoản đã được thay đổi thành công.");
        } else {
            return ResponseEntity.badRequest().body("Thay  o i tr ng th i tài kho n kh ng thành công.");
        }
    }

    @GetMapping("/accounts/skills/users")
    public ResponseEntity<?> findAccountUserAndSkills() {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<AccountUserSkillDTO> results = accountService.findAccountUserAndSkills();
            map.put("success", true);
            map.put("data", results);
            map.put("message", "Lấy dữ liệu thành công");
        } catch (RuntimeException e) {
            map.put("success", false);
            map.put("data", null);
            map.put("message", e.getMessage());
        }
        return ResponseEntity.ok(map);
    }

}
