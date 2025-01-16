package com.project.projectService.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {
    private static final String SECRET_KEY = "357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    private static final long ACCESS_EXPIRATION_TIME = 1000 * 60 * 20;  // 20 minutes
    private static final long REFRESH_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;  // 7 days

    // Generate Access Token with user role
    public String generateAccessToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .claim("tokenName", "accessToken")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME))
                .signWith(getSigningKey())  // Sign with the key
                .compact();
    }

    // Generate Refresh Token
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .claim("tokenName", "refreshToken")
                .signWith(getSigningKey())  // Sign with the key
                .compact();
    }

    // Get signing key from the SECRET_KEY
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Extract all claims from the JWT token
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())  // Use correct signing key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract specific claim from the JWT token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validate token with UserDetails object
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final String roles = extractClaim(token, claims -> claims.get("role", String.class));
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token)
                && userDetails.getAuthorities().contains(new SimpleGrantedAuthority(roles)));
    }

    // Validate token with username
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

}
