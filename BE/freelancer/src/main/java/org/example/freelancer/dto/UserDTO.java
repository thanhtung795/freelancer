package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userid;
    @NotBlank
    private String firstname;
    @NotBlank
    private String lastname;

    private AccountDTO account;
}
