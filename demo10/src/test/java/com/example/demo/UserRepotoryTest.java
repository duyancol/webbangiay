package com.example.demo;

import com.example.demo.Entity.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepotoryTest {
    @Autowired private UserRepository repo;
    @Test
    public void testAddnew(){
        user u = new user();
        u.setEmail("sp7");
        u.setPassword("12345678");
        u.setFirstName("Nguyen");
        u.setLastName("Duy");
        user saveUser=repo.save(u);
        org.assertj.core.api.Assertions.assertThat(saveUser).isNotNull();
        org.assertj.core.api.Assertions.assertThat(saveUser.getId()).isGreaterThan(0);


    }
    @Test
    public  void  listUser(){
        Iterable<user> users=repo.findAll();
        Assertions.assertThat(users).hasSizeGreaterThan(0);

        for (user u:users){

            System.out.println(u);
        }
    }
    @Test
    public  void  update(){
        Integer userid=1;
        Optional<user> optionalUser = repo.findById(userid);
        user u =optionalUser.get();
        u.setPassword("123");
        repo.save(u);

        user userupdate =repo.findById(userid).get();


        Assertions.assertThat(userupdate.getPassword()).isEqualTo("123");


    }
    @Test
    public  void  get(){
        Integer userid=2;
        Optional<user> optionalUser = repo.findById(userid);

        Assertions.assertThat(optionalUser).isPresent();
        System.out.println(optionalUser.get());


    }
    @Test
    public  void  delete(){
        Integer userid=2;
        repo.deleteById(userid);
        Optional<user> optionalUser = repo.findById(userid);

        Assertions.assertThat(optionalUser).isNotPresent();
        System.out.println("thuc hien...........");


    }
}


