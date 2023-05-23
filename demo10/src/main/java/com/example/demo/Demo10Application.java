package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.demo.Entity.user;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Demo10Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo10Application.class, args);
    }
    @Bean(name ="USER_BEAN")
    public user setUser(){
        user u = new user();
        u.setEmail("admin");
        u.setPassword("12345");
        return u;
    }

}
