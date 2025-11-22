package com.example.a3.dto;

public class TokenDTO {
    private String token;
    private String email;
    private String nome;

    public TokenDTO(String token, String email, String nome) {
        this.token = token;
        this.email = email;
        this.nome = nome;
    }

    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getNome() { return nome; }
}
