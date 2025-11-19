package com.denuncias.denuncias_service.service;

import java.util.List;

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

     System.out.println("📝 [Service] Salvando denúncia: " + denuncia);
      //  usuarioClient.usuarioExiste(denuncia.getUsuarioId());
        return denunciaRepository.save(denuncia);
    }

    public boolean existePorChavePix(String chavePix) {

        System.out.println("🔎 [Service] Verificando chavePix: " + chavePix);
        return denunciaRepository.existsByChavePix(chavePix);
    }

    public List<Denuncia> buscarPorUsuario(Long usuarioId) {
        
    System.out.println("📄 [Service] Buscando denúncias do usuário ID: " + usuarioId);
    return denunciaRepository.findByUsuarioId(usuarioId);
    }
}

