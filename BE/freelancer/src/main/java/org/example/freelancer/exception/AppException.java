package org.example.freelancer.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.freelancer.enums.ErrorCode;

@Getter
@Setter
@AllArgsConstructor
public class AppException extends RuntimeException{
    private ErrorCode errorCode;
}
