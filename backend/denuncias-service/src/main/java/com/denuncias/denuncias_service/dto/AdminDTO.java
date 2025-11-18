package com.denuncias.denuncias_service.dto;

import com.denuncias.denuncias_service.model.Status;

public class AdminDTO {
    private Status status;
    private String resposta;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }
}
