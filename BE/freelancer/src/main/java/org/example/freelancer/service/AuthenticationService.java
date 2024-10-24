package org.example.freelancer.service;

import com.nimbusds.jose.JOSEException;
import org.example.freelancer.dto.Requet.AuthenticationDtoRequest;
import org.example.freelancer.dto.Requet.IntrospectDtoRequest;
import org.example.freelancer.dto.Response.AuthenticationDtoResponse;
import org.example.freelancer.dto.Response.IntrospectDtoResponse;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationDtoResponse authenticate(AuthenticationDtoRequest request) throws JOSEException;
    IntrospectDtoResponse introspect(IntrospectDtoRequest request) throws JOSEException, ParseException;
}
