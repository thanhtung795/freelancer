package org.example.freelancer.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomJwtDecoder jwtDecoder;
    private final CustomJwtAuthenticationConverter jwtAuthenticationConverter;

    private final String[] PUBLIC_ENDPOINTS = {
            "/api/auth/login",
            "/api/auth/introspect",
            "/api/auth/logout",
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);

        http
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                        // cho phep nhung api nao chi kadmin moi dc vo
//                        .requestMatchers("/api/v1/class/getAllClass").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(configurer -> configurer
                        .jwt(jwtConfigurer -> jwtConfigurer
                                .decoder(jwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter.converter())
                        )
                );
        return http.build();
    }

}
