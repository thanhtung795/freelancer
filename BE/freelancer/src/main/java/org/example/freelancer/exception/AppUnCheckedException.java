package org.example.freelancer.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppUnCheckedException extends RuntimeException {

    private final HttpStatus status;

    public AppUnCheckedException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
