package org.example.freelancer.config;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.Requet.IntrospectDtoRequest;
import org.example.freelancer.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CustomJwtDecoder implements JwtDecoder {

    @Value("${jwt.secret-key}")
    protected String SECRET_KEY;

    private final AuthenticationService authenticationService;
    private NimbusJwtDecoder jwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            var response = authenticationService.introspect(IntrospectDtoRequest.builder()
                    .accessToken(token)
                    .build()
            );
            if (!response.getIsValid()) throw new IllegalArgumentException("invalid token");
        } catch (JOSEException | ParseException e) {
            throw new JwtException(e.getMessage());
        }

        if (Objects.isNull(jwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET_KEY.getBytes()
                    , "HS256");
            jwtDecoder = NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS256)
                    .build();
        }
        return jwtDecoder.decode(token);
    }
}
