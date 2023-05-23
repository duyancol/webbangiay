package com.example.demo.controller;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import com.example.demo.Entity.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
@SessionAttributes("email")

public class control {
    @Autowired
     UserService userService;
    @GetMapping("check")
    @ResponseBody
    public String check(@RequestParam String email, @RequestParam String password, ModelMap modelMap){
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
}
