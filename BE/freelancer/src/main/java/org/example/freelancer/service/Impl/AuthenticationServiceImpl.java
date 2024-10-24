package org.example.freelancer.service.Impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.Requet.AuthenticationDtoRequest;
import org.example.freelancer.dto.Requet.IntrospectDtoRequest;
import org.example.freelancer.dto.Response.AuthenticationDtoResponse;
import org.example.freelancer.dto.Response.IntrospectDtoResponse;
import org.example.freelancer.entity.Account;
import org.example.freelancer.enums.ErrorCode;
import org.example.freelancer.exception.AppException;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.service.AuthenticationService;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder jwtDecoder;


    @Value("${jwt.secret-key}")
    protected String SECRET_KEY;

    @Override
    public AuthenticationDtoResponse authenticate(AuthenticationDtoRequest request) throws JOSEException {
        String email = request.getEmail();

        var account = accountRepository.findByEmail(email).orElseThrow(
                () -> new IllegalIdentifierException("Tài khoản không tồn tại."));

        boolean authenticated = jwtDecoder.matches(request.getPassword()
                , account.getPassword());
        if (!authenticated) throw new IllegalIdentifierException("Mật khẩu không đúng.");

        return AuthenticationDtoResponse.builder()
                .accessToken(generateAccessToken(account))
                .build();
    }

    @Override
    public IntrospectDtoResponse introspect(IntrospectDtoRequest request) throws JOSEException, ParseException {
        String accessToken = request.getAccessToken();
         verifyJWT(accessToken);
        return IntrospectDtoResponse.builder()
                .isValid(true)
                .build();
    }


    private String generateAccessToken(Account account) throws JOSEException {
        String roleName = account.getRole();
        String userName = account.getEmail();

        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(userName)
                .jwtID(generateUUID())
                .issuer("talent_hubs.com")
                .claim("scope", roleName)
                .issueTime(new Date())
                .expirationTime(Date
                        .from(Instant.now()
                                .plus(1, ChronoUnit.HOURS)))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
        return jwsObject.serialize();
    }

    private String generateUUID() {
        return UUID.randomUUID().toString();
    }

    private SignedJWT verifyJWT(String accessToken) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(accessToken);
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean isExpired = expirationTime.after(new Date());
        boolean isVerified = signedJWT.verify(verifier);

//        String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
//        boolean isInvalidLogout = invalidTokenRepository
//                .existsInvalidTokenByInvalidTokenId(jwtId);
//
        if (!(isExpired && isVerified)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        return signedJWT;
    }

}
