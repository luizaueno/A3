package com.denuncias.denuncias_service.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.denuncias.denuncias_service.model.Status;
import com.denuncias.denuncias_service.model.Denuncia;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    long countByUsuarioIdAndDataCriacaoBetween(Long usuarioId, LocalDateTime inicio, LocalDateTime fim);
    List<Denuncia> findByStatus(Status status);
}
