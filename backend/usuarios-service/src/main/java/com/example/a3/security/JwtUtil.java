package com.example.a3.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "minha-chave-secreta"; // use uma chave forte e segura

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject(); // subject = email
    }

    public boolean validateToken(String token) {
        try {
            extractAllClaims(token); // se não lançar exceção, é válido
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(SECRET_KEY)
                   .parseClaimsJws(token)
                   .getBody();
    }

    public String generateToken(String email) {
        return Jwts.builder()
                   .setSubject(email)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10h
                   .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                   .compact();
    }
}
