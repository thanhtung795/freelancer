package org.example.freelancer.dto.Requet;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IntrospectDtoRequest {
    private String accessToken;
}
