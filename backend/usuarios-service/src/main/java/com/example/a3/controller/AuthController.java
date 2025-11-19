package com.example.a3.controller;

import com.example.a3.dto.LoginDTO;
import com.example.a3.dto.TokenDTO;
import com.example.a3.model.Usuario;
import com.example.a3.repository.UsuarioRepository;
import com.example.a3.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final TokenService tokenService;
    private final PasswordEncoder encoder;

    public AuthController(UsuarioRepository usuarioRepository, TokenService tokenService, PasswordEncoder encoder) {
        this.usuarioRepository = usuarioRepository;
        this.tokenService = tokenService;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Usuario usuario = usuarioRepository.findByEmail(login.getEmail());

        if (usuario != null && encoder.matches(login.getSenha(), usuario.getSenha())) {
            String token = tokenService.gerarToken(usuario.getEmail());
            return ResponseEntity.ok(new TokenDTO(token, usuario.getEmail(), usuario.getNome()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login inválido.");
        }
    }
}