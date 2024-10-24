package org.example.freelancer.exception;

import org.example.freelancer.dto.Response.Response;
import org.example.freelancer.dto.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // Lấy tất cả các lỗi từ BindingResult
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        // Tạo Response entity và trả về
        Response errorResponse = new Response(
                LocalDateTime.now(),
                errors,
                "Validation failed",
                HttpStatus.BAD_REQUEST.value()
        );

        return ResponseEntity.badRequest().body(errorResponse);
    }

    /*@ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ResponseObject<Object>> handleUnauthorizedException(UnauthorizedException ex) {
        ResponseObject<Object> responseObject = ResponseObject.builder()
                .result(false)
                .message("Unauthorized")
                .status(HttpStatus.UNAUTHORIZED.value())
                .data(ex.getMessage())
                .build();

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseObject);
    }*/

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseObject<Object>> handleBadException(BadRequestException ex) {
        ResponseObject<Object> responseObject = ResponseObject.builder()
                .result(false)
                .message("Bad Request")
                .status(HttpStatus.BAD_REQUEST.value())
                .data(ex.getMessage())
                .build();

        return ResponseEntity.badRequest().body(responseObject);
    }

    /*@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<ResponseObject<Object>> handleBadException(InternalServerErrorException ex) {
        ResponseObject<Object> responseObject = ResponseObject.builder()
                .result(false)
                .message("Internal Server Error")
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .data(ex.getMessage())
                .build();

        return ResponseEntity.internalServerError().body(responseObject);
    }*/

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseObject<Object>> handleNotFoundException(NotFoundException ex) {
        ResponseObject<Object> responseObject = ResponseObject.builder()
                .result(false)
                .message("Not Found")
                .status(HttpStatus.NOT_FOUND.value())
                .data(ex.getMessage())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseObject);
    }
}
