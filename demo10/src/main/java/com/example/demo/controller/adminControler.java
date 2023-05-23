package com.example.demo.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/admin")
public class adminControler {

    @Autowired
    private ProductService service1;
    @GetMapping("show")

    List<Product> getProductAll(){

        return  service1.listAllProduct();

    }
}
