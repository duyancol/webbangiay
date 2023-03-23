package com.example.demo.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
//    @Autowired private UserRepository repo;
//    public List<user> listAll(){
//        return (List<user>) repo.findAll();
//
//    }

    @Autowired private ProductDao repo;
    public List<Product> listAll(){
        return  repo.load3ProductNew();

    }
    public List<Product> findByName(int count,int limit) {
        return repo.load3ProductNext(count,limit);
    }

}
