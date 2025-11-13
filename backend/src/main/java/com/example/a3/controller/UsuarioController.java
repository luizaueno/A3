package com.example.a3.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.a3.dto.UsuarioDTO;
import com.example.a3.model.Usuario;
import com.example.a3.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioDTO dto) {
        if(dto.getNome() == null || dto.getNome().isBlank() ||
          dto.getTelefone() == null || dto.getTelefone().isBlank() ||
        dto.getEmail() == null || dto.getEmail().isBlank() ||
        dto.getSenha() == null || dto.getSenha().isBlank() ||
        dto.getConfirmarSenha() == null || dto.getConfirmarSenha().isBlank()) {
        return ResponseEntity.badRequest().body("Campos obrigatórios não preenchidos");
        }

        if (usuarioRepository.findByEmail(dto.getEmail()) != null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
        }
            
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(encoder.encode(dto.getSenha())); // ← Criptografa aqui!

        try {
            usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
        }
    }
}