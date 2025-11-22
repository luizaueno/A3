package com.example.a3.repository;
import com.example.a3.model.Usuario; 

import org.springframework.data.jpa.repository.JpaRepository;



public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   Usuario findByEmail(String email);
}