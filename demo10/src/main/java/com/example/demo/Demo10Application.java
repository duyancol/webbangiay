package com.example.demo;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.demo.Entity.user;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

@SpringBootApplication
//@EnableWebSecurity
//@EnableJpaRepositories

public class Demo10Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo10Application.class, args);
    }
//    @Bean(name ="USER_BEAN")
//    public user setUser(){
//        user u = new user();
//        u.setEmail("admin");
//        u.setPassword("12345");
//        return u;
//    }
//    @Bean
//    BCryptPasswordEncoder bCryptPasswordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//    @Bean
//    CommandLineRunner run(UserService userService){
//        return args -> {
//            userService.saveRole(new Role(null,"ROLE_USER"));
//            userService.saveRole(new Role(null,"ROLE_MANAGER"));
//            userService.saveRole(new Role(null,"ROLE_ADMIN"));
//            userService.saveRole(new Role(null,"ROLE_SUPER_ADMIN"));
//
//                userService.saveUser(new User(null,"nguyenduy","nguyenduy","nd@gmail.com","123",new HashSet<>()));
//            userService.addToUser("nd@gmail.com","ROLE_USER");
//        };
//    }

}
