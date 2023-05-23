package com.example.demo.controller;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.user;

import java.util.List;
@Controller
@RequestMapping("/")
@SessionAttributes("email")


public class UserController {

    @Autowired
    UserService userService;
    @RequestMapping("/login")
    public String showLogin(){
        return "login";
    }

    @PostMapping ("/checkLogin")

    public  String checkLogin(@RequestParam("email") String email, @RequestParam("password") String password, ModelMap modelMap){
//        if(userBean.getEmail().equals(email) && userBean.getPassword().equals(password)){
//            System.out.println("Login thanh cong");
//            return "index";
//        }else{
//            System.out.println("Login k thanh cong");
//        }
        if(userService.checkLogin(email,password)){

            System.out.println("thanh cong");

           modelMap.addAttribute("email",email);
            return "index";

        }else{
            System.out.println("that bai");
            return "login";
        }



    }

    @GetMapping("/logout")
    public String logout(){
        return "index";
    }
}
