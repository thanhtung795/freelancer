package org.example.freelancer.dto.Response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationDtoResponse {
    private String accessToken;
}
