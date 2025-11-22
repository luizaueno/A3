

package com.denuncias.denuncias_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "usuario-service", url = "http://localhost:8080")
public interface UsuarioClient {

    @GetMapping("/usuarios/{id}")
    Object usuarioExiste(@PathVariable("id") Long id);
}
