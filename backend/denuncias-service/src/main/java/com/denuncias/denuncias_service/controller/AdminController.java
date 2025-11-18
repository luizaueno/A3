package com.denuncias.denuncias_service.controller;

import com.denuncias.denuncias_service.dto.AdminDTO;
import com.denuncias.denuncias_service.dto.DenunciaStatusDTO;
import com.denuncias.denuncias_service.model.Denuncia;
import com.denuncias.denuncias_service.repository.DenunciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.denuncias.denuncias_service.model.Status;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private DenunciaRepository denunciaRepository;

    // 🔍 Listar todas as denúncias para moderação
    @GetMapping
    public List<Denuncia> listarDenuncias() {
        return denunciaRepository.findAll();
    }

    // 🔄 Atualizar status e resposta de uma denúncia
    @PutMapping("/{id}")
    public void atualizarDenuncia(@PathVariable Long id, @RequestBody AdminDTO adminDTO) {
        Denuncia denuncia = denunciaRepository.findById(id).orElseThrow();
        denuncia.setStatus(adminDTO.getStatus());
        denuncia.setResposta(adminDTO.getResposta());
        denunciaRepository.save(denuncia);
    }

    @GetMapping("/denuncias/status/{status}")
public List<DenunciaStatusDTO> listarPorStatus(@PathVariable Status status) {
    List<Denuncia> denuncias = denunciaRepository.findByStatus(status);

    return denuncias.stream().map(denuncia -> {
        DenunciaStatusDTO dto = new DenunciaStatusDTO();
        dto.setDenuncia(denuncia);

        switch (denuncia.getStatus()) {
            case RESOLVIDA:
                dto.setCor("verde");
                dto.setStatus("Resolvida");
                dto.setMensagem("Denúncia resolvida com sucesso.");
                break;
            case EM_ANDAMENTO:
                dto.setCor("amarelo");
                dto.setStatus("Em andamento");
                dto.setMensagem("Denúncia em análise.");
                break;
            case RECUSADA:
                dto.setCor("vermelho");
                dto.setStatus("Recusada");
                dto.setMensagem("Denúncia recusada.");
                break;
        }

        return dto;
    }).toList();
}

}
