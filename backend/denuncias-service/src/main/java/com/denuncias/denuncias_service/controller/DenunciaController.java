package com.denuncias.denuncias_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.denuncias.denuncias_service.model.Denuncia;
import com.denuncias.denuncias_service.service.DenunciaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    @Autowired
    private DenunciaService denunciaService;

    @PostMapping
    public ResponseEntity<?> criarDenuncia(@RequestBody @Valid Denuncia denuncia) {
        try {
            Denuncia salva = denunciaService.salvar(denuncia);
            return ResponseEntity.status(HttpStatus.CREATED).body(salva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao salvar denúncia: " + e.getMessage());
        }
    }
}
