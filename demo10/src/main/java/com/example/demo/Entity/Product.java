package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer id;
    @Column(nullable = false,unique = true,length = 45)
    private String name;
    @Column(length = 15,nullable = false)
    private int price;
    @Column(length = 15,nullable = false)
    private int quantity;
    @Column(length = 45,nullable = false,name = "img")
    private String img;
    @Column(length = 45,nullable = false,name = "category")
    private String category;
    @Column(length = 45,nullable = false,name = "derectory")
    private String derectory;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDerectory() {
        return derectory;
    }

    public void setDerectory(String derectory) {
        this.derectory = derectory;
    }
}
