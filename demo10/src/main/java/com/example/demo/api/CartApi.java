package com.example.demo.api;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.CartService;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import com.example.demo.auth.AuthenticationRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Map;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/auth")
@Component
@SessionScope
public class CartApi {
    @Autowired
    private ProductService service;
    @Autowired
    private CartService cartService;

//    @PostMapping("/save")
//    public ResponseEntity<String> saveCart(@RequestBody Map<Long, Integer> cartMap) {
//        try {
//            cartService.saveCart(cartMap);
//            return ResponseEntity.ok("Cart saved successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving cart");
//        }
//    }
//    @GetMapping(path="addCart/{id}")
//    public Cart addCart(@PathVariable("id") int id, Model model, HttpServletRequest request){
//
//
////        Product product = service.findByProductId(id);
////
////        if(product != null){
////           Cart  cart= (Cart) session.getAttribute("cart");
////            if(cart == null){
////                cart=Cart.getInstance();
////            }
////            cart.put(product);
////            session.setAttribute("cart",cart);
////            model.addAttribute("p",product);
////            System.out.println(cart.getProductList());
////            return cart;
////
////        }else {
////           return null ;
////        }
//
//        Cart cart;
//        Product product =service.findByProductId(id);
//        if(product != null){
//            HttpSession session = request.getSession();
//             cart = (Cart) session.getAttribute("cart");
//            if(cart == null){
//                cart=Cart.getInstance();
//            }
//            cart.put(product);
//            session.setAttribute("cart",cart);
//            System.out.println(cart.getProductList());
//            return cart;
//        }
//        return null;
//
//
//
//    }
}
