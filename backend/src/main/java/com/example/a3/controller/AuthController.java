package com.example.a3.controller;

import com.example.a3.dto.LoginDTO;
import com.example.a3.model.Usuario;
import com.example.a3.repository.UsuarioRepository;
import com.example.a3.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @CrossOrigin(origins = "http://localhost:5173") //  libera acesso do front-end
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        if (login.getEmail() == null || login.getEmail().isBlank() ||
            login.getSenha() == null || login.getSenha().isBlank()) {
            return ResponseEntity.badRequest().body("Preencha email e senha.");
        }

        Usuario usuario = usuarioRepository.findByEmail(login.getEmail());

        if (usuario != null && encoder.matches(login.getSenha(), usuario.getSenha())) {
            String token = tokenService.gerarToken(usuario.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login inválido.");
        }
    }
}