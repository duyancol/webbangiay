package com.example.demo.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired private ProductRepository repository;


    @Autowired private ProductDao repo;
    public List<Product> listAll(){
        return  repo.load3ProductNew();

    }
    public List<Product> listAllProduct(){
        return  repo.loadAllproduct();

    }
    public List<Product> findByName(int count,int limit) {
        return repo.load3ProductNext(count,limit);
    }
    public Product findByProductId(int id){

        Product optionalProduct = repo.getProductById(id);
        return  optionalProduct;
    }

}
