package org.example.freelancer.dto.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private int statusCode;
    private String message;
    private Object data;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateTime;

    public Response(LocalDateTime dateTime, Object data, String message, int status) {
        this.data = data;
        this.message = message;
        this.statusCode = status;
        this.dateTime = dateTime;
    }

}