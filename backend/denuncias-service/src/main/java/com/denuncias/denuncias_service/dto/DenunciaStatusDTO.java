package com.denuncias.denuncias_service.dto;

import com.denuncias.denuncias_service.model.Denuncia;

public class DenunciaStatusDTO {
    private String cor;
    private String status;
    private String mensagem;
    private Denuncia denuncia;

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Denuncia getDenuncia() {
        return denuncia;
    }

    public void setDenuncia(Denuncia denuncia) {
        this.denuncia = denuncia;
    }
}
