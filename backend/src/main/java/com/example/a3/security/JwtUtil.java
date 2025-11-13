package com.example.a3.security;
import io.jsonwebtoken.Jwts; // valida o token
import org.springframework.stereotype.Component; // spring injeta em outras partes do sistema

@Component
public class JwtUtil {
    private final String SECRET_KEY = "minhaChaveSecreta"; // define a chave para validar. igual no authController
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true; // decodifica o token usando a chave
        } catch (Exception e) {
            return false;
        }
    }
}
