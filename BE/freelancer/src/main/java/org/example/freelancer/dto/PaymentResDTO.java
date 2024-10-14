package org.example.freelancer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentResDTO {
    private String status;
    private String message;
    private String url;
}
