package com.example.demo.controller;

import com.example.demo.Entity.Feedback;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductService;
import com.example.demo.Ex.UserNotFoundException;
import com.example.demo.model.Email;
import com.example.demo.model.EmailUntilt;
import com.example.demo.reposity.FeedBackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class FeedBackController {
    @Autowired
    private FeedBackRepository repository;
    @GetMapping("/listFeedBack")
    List<Feedback> gettFeedBackAll(){

        return  repository.findAll();

    }
    @PostMapping("/postFeedBack")
    public ResponseEntity<String> posttFeedBack(@RequestParam("email") String email, @RequestParam("content") String content){
Feedback feedback = new Feedback();
feedback.setEmail(email);
feedback.setContent(content);
feedback.setStatus("No response");
        repository.save(feedback);
        return ResponseEntity.ok("Thêm phan hoi thành công!");

    }
    @PutMapping("/putFeedBack")
    public Feedback putFeedBack(@RequestParam("email") String email, @RequestParam("content") String content,@RequestParam("id") Long id){

        Feedback feedback =repository.findById(id).map(f->{
           f.setStatus("Responded");
            return repository.save(f);
        }).orElseThrow(()-> new UserNotFoundException(Integer.parseInt(String.valueOf(id))));
        Email email1 = new Email();
        email1.setFrom("nguyenduy.30719@gmail.com");
        email1.setFromPss("iuntfgqwytqmwsvr");
        email1.setTo(email);
        email1.setSubject("Response :");
        StringBuilder sb= new StringBuilder();
        sb.append("<p>Hello,</p>").append("<br>");
        sb.append("-" + "  "+"Content : "+ content).append("<br>");


        email1.setContent(sb.toString());
        try {
            EmailUntilt.send(email1);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return feedback;

    }
}
