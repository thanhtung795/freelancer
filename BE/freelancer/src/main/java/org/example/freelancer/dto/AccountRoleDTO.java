package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountRoleDTO {
    private Integer id;

    @NotNull(message = "Email không được bỏ trống")
    @NotEmpty(message = "Email không được bỏ trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    private String role;

    @NotEmpty(message = "Password không được bỏ trống")
    private String password;

    private Boolean status;

    private Integer idRole;
}
