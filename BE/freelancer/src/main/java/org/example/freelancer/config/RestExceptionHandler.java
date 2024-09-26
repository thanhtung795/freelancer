package org.example.freelancer.config;

import org.example.freelancer.dto.ErrorDTO;
import org.example.freelancer.exception.AppUnCheckedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {AppUnCheckedException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(AppUnCheckedException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(ErrorDTO.builder().message(ex.getMessage()).build());
    }
}