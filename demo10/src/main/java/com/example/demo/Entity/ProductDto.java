package com.example.demo.Entity;

public class ProductDto {
    private String name;
    private Double price;
    private Integer quantity;
    private String img;

    public ProductDto() {
    }

    public ProductDto(String name, Double price, Integer quantity, String img) {

        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
