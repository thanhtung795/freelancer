package org.example.freelancer.dto.Requet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationDtoRequest {
    private String email;
    private String password;
}
