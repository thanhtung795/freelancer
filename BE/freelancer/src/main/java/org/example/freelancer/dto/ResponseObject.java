package org.example.freelancer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response Object containing message, status, and data")
public class ResponseObject<T> {

    @JsonProperty("result")
    @Builder.Default
    private boolean result = true;

    @JsonProperty("message")
    @Schema(description = "Response message")
    private String message;

    @JsonProperty("status")
    @Schema(description = "HTTP status code")
    private int status;

    @JsonProperty("data")
    @Schema(description = "Response data")
    private T data;
}