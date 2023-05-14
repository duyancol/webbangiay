package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//
//import jakarta.persistence.Entity;
//
//import java.io.Serializable;
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.Map;
//
//public class Cart implements Serializable {
//    Product product;
//
//
//    public Product getProduct() {
//        return product;
//    }
//
//    public void setProduct(Product product) {
//        this.product = product;
//    }
//
//    private static final long serialVersionUID = 1L;
//    //   private static Cart instance;
//    private final Map<String, Product> productList;
//
//    private Cart() {
//        productList = new HashMap<>();
//    }
//
//    public static Cart getInstance() {
////            if(instance == null){
////                instance = new Cart();
////            }
////            return instance;
//        return new Cart();
//    }
//
//    public void put(Product product) {
//        if (productList.containsKey(product.getId())) {
//            upQuantity(String.valueOf(product.getId()));
//        } else
//            product.setQuantitySol(1);
//        productList.put(String.valueOf(product.getId()), product);
//    }
//
//    private void upQuantity(String id) {
//        Product product = productList.get(id);
//        product.setQuantitySol(product.getQuantitySol() + 1);
//    }
//
//    public Product get(String id) {
//        return productList.get(id);
//    }
//
//    public Product remove(String id) {
//        return productList.remove(id);
//    }
//
////    public void UpdateQuantity(String id, int quantity) {
////        Product product = productList.get(id);
////        product.setQuantitySol(quantity);
////    }
//
////    public double getTotalPrice() {
////        double totalPrice = 0;
////        for (Product product : productList.values()) {
////            totalPrice += product.getTotalMoney();
////        }
////        return totalPrice;
////    }
//
//    public int getTotalPrice1() {
//        int totalPrice = 0;
//        for (Product product : productList.values()) {
//            totalPrice = productList.size();
//        }
//        return totalPrice;
//    }
//
////    public double getTotalQuantity() {
////        double totalQuantity = 0;
////        for (Product product : productList.values()) {
////            totalQuantity += product.getQuantitySol();
////        }
////        return totalQuantity;
////    }
//
//    public Collection<Product> getProductList() {
//        return productList.values();
//    }
//
//
//    public int UpdateQuantitySold(String id, int quantity) {
//        Product product = productList.get(id);
//        if (quantity < 1 || quantity > product.getQuantity()) {
////            return product.getQuantitySol();
//            return product.getQuantity();
//        }
////        product.setQuantitySol(quantity);
////        return product.getQuantitySol();
//        return 1;
//    }
//
//    //    public String getTotalName(){
////        String name ="";
////
////        for (Product pd:productList.values()){
////            name+= pd.getName()+"\t"+"price:"+pd.getPrice()+"\t"+"quantity:"+pd.getQuantitySol()+"\t\n";
////
////
////
////        }
////        return name;
////
////
////    }
//    public String getTotalName1() {
//        String sum;
//        if (true) {
//            for (Product pd : productList.values()) {
//                sum = (pd.getName()) + "";
//                return sum;
//
//
//            }
//        } else {
//            return null;
//        }
//
//
//        return null;
//    }
//}
//

//@Entity
//@Table(name = "cart")
//public class Cart {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<CartItem> items = new ArrayList<>();
//
//    // getter, setter, constructors
//
//    public Cart() {
//    }
//
//    public Cart(Long id, List<CartItem> items) {
//        this.id = id;
//        this.items = items;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public List<CartItem> getItems() {
//        return items;
//    }
//
//    public void setItems(List<CartItem> items) {
//        this.items = items;
//    }
//}


@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    private String userID;
    private  String address;
    private  String status;
    private  String price;
    private  String phone;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true  ,fetch = FetchType.EAGER)
    @JsonIgnore
    private List<CartItem> cartItems = new ArrayList<>();
//@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
//private List<CartItem> cartItems = new ArrayList<>();


    public Cart() {
    }

    public Cart(Long id, LocalDateTime createdAt, String userID, String address, String status, String price,String phone, List<CartItem> cartItems) {
        this.id = id;
        this.createdAt = createdAt;
        this.userID = userID;
        this.address = address;
        this.status = status;
        this.price = price;
        this.phone = phone;
        this.cartItems = cartItems;
    }

    public Cart(Long id, String status) {
        this.id = id;
        this.status = status;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}