package org.example.freelancer.controller;

import com.nimbusds.jose.JOSEException;
import org.example.freelancer.dto.*;
import org.example.freelancer.dto.Requet.AuthenticationDtoRequest;
import org.example.freelancer.dto.Requet.IntrospectDtoRequest;
import org.example.freelancer.dto.Response.AuthenticationDtoResponse;
import org.example.freelancer.dto.Response.IntrospectDtoResponse;
import org.example.freelancer.service.AccountService;
import org.example.freelancer.service.AuthenticationService;
import org.example.freelancer.service.RegisterService;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.text.ParseException;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private  AuthenticationService authenticationService;


    @Autowired
    private RegisterService registerService;

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        List<AccountDTO> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/download/accounts/excel")
    public ResponseEntity<byte[]> downloadAccounts() {
        List<AccountUserSkillDTO> accountUserSkillDTOs = accountService.findAccountUserAndSkills();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            accountService.exportAccountsToExcel(accountUserSkillDTOs, outputStream);
            byte[] excelBytes = outputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=accounts.xlsx");
            return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/download/accounts/pdf")
    public ResponseEntity<byte[]> downloadAccountsPDF() {
        List<AccountUserSkillDTO> accountUserSkillDTOs = accountService.findAccountUserAndSkills();

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            accountService.exportAccountsToPDF(accountUserSkillDTOs, outputStream);

            byte[] pdfBytes = outputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=accounts.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*@PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            map.put("success", true);
            map.put("data", registerService.registerAccount(registerDTO));
            map.put("message", "Đăng kí thành công");
        } catch (RuntimeException e) {
            map.put("success", false);
            map.put("data", null);
            map.put("message", "Đăng kí thất bị: " + e.getMessage());
        }
        return ResponseEntity.ok(map);
    }*/

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            map.put("success", true);
            map.put("data", registerService.registerAccount(registerDTO));
            map.put("message", "Đăng kí thành công");

            return ResponseEntity.status(HttpStatus.CREATED).body(map);

        } catch (RuntimeException e) {
            map.put("success", false);
            map.put("data", null);
            map.put("message", "Đăng kí thất bại");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Integer id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.ok("Account deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
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

    //    @PostMapping("/login")
//    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
//        try {
//            AccountRoleDTO accountRoleDTO = accountService.login(loginDTO.getEmail(), loginDTO.getPassword());
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", true);
//            response.put("message", "Login successful");
//            response.put("data", accountRoleDTO);
//            return ResponseEntity.ok(response);
//        } catch (RuntimeException e) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("success", false);
//            response.put("message", e.getMessage());
//            return ResponseEntity.badRequest().body(response);
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDtoRequest request) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            AuthenticationDtoResponse authenticationDtoResponse = authenticationService.authenticate(request);
            response.put("status",HttpStatus.OK.value());
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("data", authenticationDtoResponse);
            return ResponseEntity.ok(response);
        } catch (IllegalIdentifierException | JOSEException e) {
            response.put("status",HttpStatus.BAD_REQUEST.value());
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    @PostMapping("/introspect")
    public ResponseEntity<?> introspect(@RequestBody IntrospectDtoRequest request) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            IntrospectDtoResponse introspectDtoResponse = authenticationService.introspect(request);
            response.put("status",HttpStatus.OK.value());
            response.put("success", true);
            response.put("message", "Introspect successful");
            response.put("data", introspectDtoResponse);
            return ResponseEntity.ok(response);
        } catch (IllegalIdentifierException | JOSEException | ParseException e) {
            response.put("status",HttpStatus.BAD_REQUEST.value());
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
