package com.example.demo.controller;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import com.example.demo.Entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

@Controller
@SessionAttributes("email")
public class ProductController {
//    @GetMapping("users")
//    public String showHomePage(){
//        System.out.println("main controler");
//        return "index";
//
//    }
    @Autowired private ProductService service;

    @GetMapping("/")

    public String showUserList(Model model){
        List<Product> userList = service.listAll();
        model.addAttribute("userList",userList);

        System.out.println("main controler");
        return "index";

    }

}
