package com.project.projectService.Configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CSPFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, java.io.IOException {

        // Add Content-Security-Policy header
        response.setHeader("Content-Security-Policy", "connect-src 'self' ws://localhost:8080; default-src 'self';");

        filterChain.doFilter(request, response);
    }
}
