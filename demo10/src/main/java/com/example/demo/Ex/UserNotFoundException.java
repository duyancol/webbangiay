package com.example.demo.Ex;

import org.springframework.web.bind.annotation.ControllerAdvice;


public class UserNotFoundException extends  RuntimeException{
    public UserNotFoundException(int id){
        super("Cound not" +id);
    }
}
