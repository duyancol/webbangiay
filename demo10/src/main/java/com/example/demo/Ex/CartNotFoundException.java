package com.example.demo.Ex;

public class CartNotFoundException extends  RuntimeException{
    public CartNotFoundException(long id){
        super("Cound not" +id);
    }
}
