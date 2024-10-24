
package org.example.freelancer.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INVALID_TOKEN(1001, "Invalid Token")
    ;

    private final Integer status;
    private final String message;
}
