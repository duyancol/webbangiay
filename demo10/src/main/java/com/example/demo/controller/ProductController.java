package com.example.demo.controller;

import com.example.demo.Entity.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;
import java.util.Optional;

@Controller

@CrossOrigin("http://localhost:3000")


public class ProductController {
//    @GetMapping("users")
//    public String showHomePage(){
//        System.out.println("main controler");
//        return "index";
//
//    }
    @Autowired private ProductService service;
    @Autowired private ProductRepository service1;

    @GetMapping("/")

    public String showUserList(Model model){
        List<Product> userList = service.listAll();
        model.addAttribute("userList",userList);


        return "index";

    }
    @GetMapping("details")
    public String getProductById(@RequestParam("id") int id,Model model){
        Product p = service.findByProductId(id);
        model.addAttribute("p",p);
        System.out.println(p.getId());
        return "details";

    }



}
