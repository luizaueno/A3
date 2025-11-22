package com.denuncias.denuncias_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class DenunciasServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DenunciasServiceApplication.class, args);
	}

}
