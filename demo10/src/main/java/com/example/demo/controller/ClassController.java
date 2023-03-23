package com.example.demo.controller;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class ClassController {
    @Autowired private ProductService repo;

    @GetMapping

    public ResponseEntity<Iterable<Product>> getAll(int ex, int limit){


        return new ResponseEntity<>(repo.findByName(ex,limit), HttpStatus.OK);

    }

}
