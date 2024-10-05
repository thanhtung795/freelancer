package org.example.freelancer.exception;

import jakarta.servlet.http.HttpServletResponse;

public class NotFoundException extends RuntimeException {

    private static final long serialVersionUID = -5599671479038007192L;
    private final int statusCode;

    public NotFoundException(String message) {
        super(message);
        this.statusCode = HttpServletResponse.SC_NOT_FOUND;
    }

    public NotFoundException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
