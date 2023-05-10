package com.example.demo.controller;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.CartService;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
//@SessionAttributes("email")

public class CartController {
 //   @Autowired
    //  private ProductService service;
//    @PostMapping("addCart")
//
//    public String addCart(@RequestParam("id") int id, Model model, HttpSession session){
//
//
//        Product product = service.findByProductId(id);
//
//        if(product != null){
//            Cart cart= (Cart) session.getAttribute("cart");
//            if(cart == null){
//                cart=Cart.getInstance();
//            }
//            cart.put(product);
//            session.setAttribute("cart",cart);
//            model.addAttribute("p",product);
//            System.out.println(cart.getProductList());
//
//        }
//
//        return "index";
//
//    }  //

}
