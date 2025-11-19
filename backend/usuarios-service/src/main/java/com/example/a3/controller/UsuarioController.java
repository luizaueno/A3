package com.example.a3.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.a3.dto.UsuarioDTO;
import com.example.a3.model.Usuario;
import com.example.a3.repository.UsuarioRepository;
import com.example.a3.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

public UsuarioController(UsuarioRepository usuarioRepository, JwtUtil jwtUtil, PasswordEncoder encoder) {
    this.usuarioRepository = usuarioRepository;
    this.jwtUtil = jwtUtil;
    this.encoder = encoder;
}

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
            .map(usuario -> ResponseEntity.ok(usuario))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioDTO dto) {
        if(dto.getNome() == null || dto.getNome().isBlank() ||
           dto.getTelefone() == null || dto.getTelefone().isBlank() ||
           dto.getEmail() == null || dto.getEmail().isBlank() ||
           dto.getSenha() == null || dto.getSenha().isBlank() ||
           dto.getConfirmarSenha() == null || dto.getConfirmarSenha().isBlank()) {
            return ResponseEntity.badRequest().body("Campos obrigatórios não preenchidos");
        }

       
     if (!dto.getSenha().equals(dto.getConfirmarSenha())) {
        return ResponseEntity.badRequest().body("As senhas não coincidem.");
    }

    if (usuarioRepository.findByEmail(dto.getEmail()) != null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
    }

    Usuario usuario = new Usuario();
    usuario.setNome(dto.getNome());
    usuario.setTelefone(dto.getTelefone());
    usuario.setEmail(dto.getEmail());
    usuario.setSenha(encoder.encode(dto.getSenha())); // criptografa senha

    try {
        usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    } catch (DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
    }
}
    @GetMapping("/me")
public ResponseEntity<?> getUsuarioLogado(@RequestHeader("Authorization") String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token ausente ou inválido");
    }

    String token = authHeader.substring(7); // remove "Bearer "
    String email = jwtUtil.extractUsername(token); // extrai o email do token

    Usuario usuario = usuarioRepository.findByEmail(email);
    if (usuario == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
    }

    return ResponseEntity.ok(usuario);
}

}
