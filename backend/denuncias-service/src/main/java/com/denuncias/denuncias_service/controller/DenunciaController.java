package com.denuncias.denuncias_service.controller;

import java.util.List;
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
        System.out.println("📩 [POST] Criando denúncia: " + denuncia);
        try {
            Denuncia salva = denunciaService.salvar(denuncia);
            return ResponseEntity.status(HttpStatus.CREATED).body(salva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao salvar denúncia: " + e.getMessage());
        }
    }

    @GetMapping("/chave/{chavePix}")
    public ResponseEntity<?> verificarDenuncia(@PathVariable String chavePix) {
        System.out.println("🔍 [GET] Verificando chavePix: " + chavePix);
        boolean existe = denunciaService.existePorChavePix(chavePix);
        if (existe) {
            return ResponseEntity.ok("🚨 Denúncia encontrada!");
        } else {
            return ResponseEntity.ok("✅ Nenhuma denúncia registrada");
        }
    }

   
    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long id) {
     System.out.println("📄 [GET] Listando denúncias do usuário ID: " + id);
        try {
            List<Denuncia> denuncias = denunciaService.buscarPorUsuario(id);
            return ResponseEntity.ok(denuncias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Erro ao buscar denúncias: " + e.getMessage());
        }
    }

   
    @GetMapping
    public ResponseEntity<?> listarTodas() {
        System.out.println("📋 [GET] Listando todas as denúncias");
    try {
        List<Denuncia> todas = denunciaService.listarTodas();
        return ResponseEntity.ok(todas);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Erro ao listar denúncias: " + e.getMessage());
    }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarDenuncia(@PathVariable Long id, @RequestBody Denuncia atualizada) {
    System.out.println("✏️ [PUT] Atualizando denúncia ID: " + id);
        try {
            Denuncia atualizadaFinal = denunciaService.atualizar(id, atualizada);
            return ResponseEntity.ok(atualizadaFinal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
        }
    }
}
