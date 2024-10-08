package org.example.freelancer.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
public class RegisterDTO {

    @Size(max = 255)
    @NotNull
    private String email;  // Email

    @Size(max = 255)
    private String password;  // Mật khẩu

    @NotNull
    private String role;  // Vai trò

    @NotNull
    private Boolean status;  // Trạng thái (true/false)

    @Size(max = 255)
    @NotNull
    private String firstName;  // Tên

    @Size(max = 255)
    @NotNull
    private String lastName;  // Họ

    @Size(max = 20)
    private String phoneNumber;  // Số điện thoại

    @Size(max = 255)
    private String address;  // Địa chỉ

}
