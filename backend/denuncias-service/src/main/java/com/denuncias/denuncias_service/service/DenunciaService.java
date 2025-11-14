package com.denuncias.denuncias_service.service;

import org.springframework.stereotype.Service;
import com.denuncias.denuncias_service.model.Denuncia;
import com.denuncias.denuncias_service.repository.DenunciaRepository;

@Service
public class DenunciaService {

    private final UsuarioClient usuarioClient;
    private final DenunciaRepository denunciaRepository;

    public DenunciaService(UsuarioClient usuarioClient, DenunciaRepository denunciaRepository) {
        this.usuarioClient = usuarioClient;
        this.denunciaRepository = denunciaRepository;
    }

    public Denuncia salvar(Denuncia denuncia) {
        usuarioClient.usuarioExiste(denuncia.getUsuarioId());
        return denunciaRepository.save(denuncia);
    }
}

