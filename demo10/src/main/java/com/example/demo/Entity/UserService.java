package com.example.demo.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
        @Autowired
        private UserRepository repo;
    @Autowired   private  UserDao userDao;
    public boolean checkLogin(String email, String password){

        Optional<user> o=userDao.findByEmail(email);
        if(o.isPresent() &&o.get().getPassword().equals(password)){
            return true;
        }
        return false;
    }
}
