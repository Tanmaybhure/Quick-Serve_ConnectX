package com.project.projectService.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for now
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login").permitAll() // Allow public access to /api/login
                        .anyRequest().authenticated() // Protect other endpoints
                )
                .httpBasic(httpBasic -> httpBasic.disable()) // Disable basic auth
                .formLogin(form -> form.disable()); // Disable login form

        return http.build();
    }
}
