package com.example.demo.Entity;


import com.example.demo.model.Email;
import com.example.demo.model.EmailUntilt;
import com.example.demo.reposity.CartItemRepository;
import com.example.demo.reposity.CartRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;

//public interface CartService {
//    Cart save(Cart cart);
//}


@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public void saveCart(String cartJson) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(cartJson, JsonObject.class);

        Cart cart = new Cart();
        cart.setCreatedAt(LocalDateTime.now());
        JsonObject cartJsonObject = jsonObject.getAsJsonObject("cart");
        cart.setUserID(cartJsonObject.get("userID").getAsString());
        cart.setAddress(cartJsonObject.get("address").getAsString());
        cart.setStatus(cartJsonObject.get("status").getAsString());
        cart.setPrice(cartJsonObject.get("price").getAsString());
        cart.setPhone(cartJsonObject.get("phone").getAsString());
        if(cartJsonObject==null){
            System.out.println("ra cái nay ne dm coc vl");
        }

        List<CartItem> cartItems = new ArrayList<>();

        JsonArray itemsJsonArray = jsonObject.getAsJsonArray("listProduct");
        for (int i = 0; i < itemsJsonArray.size(); i++) {
            JsonObject itemJsonObject = itemsJsonArray.get(i).getAsJsonObject();

            CartItem cartItem = new CartItem();
            cartItem.setName(itemJsonObject.get("name").getAsString());
            cartItem.setPrice(itemJsonObject.get("price").getAsDouble());
            cartItem.setQuantity(itemJsonObject.get("quantity").getAsInt());
            cartItem.setImg(itemJsonObject.get("img").getAsString());
            cartItem.setCart(cart);

            cartItems.add(cartItem);
        }

        cart.setCartItems(cartItems);



        cartRepository.save(cart);







        Email email1 = new Email();
        email1.setFrom("nguyenduy.30719@gmail.com");
        email1.setFromPss("iuntfgqwytqmwsvr");
        email1.setTo("19130057@st.hcmuaf.edu.vn");
        email1.setSubject("The order you have placed :");
        StringBuilder sb= new StringBuilder();
        sb.append("Cảm ơn bạn đã ủng hộ shop của chúng tôi").append("<br>");
        sb.append("Thông tin hóa đơn :").append("<br>");
        sb.append("-" + "  "+"Tên khách hàng : "+cartJsonObject.get("userID").getAsString()).append("<br>");
        sb.append("-" + "  "+"Địa chỉ : "+cartJsonObject.get("address").getAsString()).append("<br>");
        sb.append("-" + "  "+"Số điện thoại : "+cartJsonObject.get("phone").getAsString()).append("<br>");
        sb.append("-" + "  "+ "Product :").append("<br>");
        for (CartItem c :cartItems){

            sb.append("  ." + "  Name product: "+ c.getName() + "  ,Price : "+c.getPrice()+"  ,Quantity : "+c.getQuantity()).append("<br>");

        }
        sb.append("-" + "  "+"Total : "+ cartJsonObject.get("price").getAsString()).append("<br>");
        sb.append("-" +"  "+ "Đơn hàng của bạn sẽ đươc giao trong vài ngày tới. Mong bạn hãy giữ thông tin liên lạc . ").append("<br>");
        sb.append("-" + "  "+"Xin cảm ơn ! ").append("<br>");
        email1.setContent(sb.toString());
        try {
            EmailUntilt.send(email1);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        }


    public CartDto getCartWithProductsByUserId(String userId) {
        List<Cart> cartList = cartRepository.findByUserCartID(userId);
        if (cartList.isEmpty()) {
            return null;
        }
        Cart cart = cartList.get(0);
        List<ProductDto> productDtoList = cart.getCartItems().stream()
                .map(item -> new ProductDto(item.getName(), item.getPrice(), item.getQuantity(), item.getImg()))
                .collect(Collectors.toList());
        return new CartDto(cart.getUserID(), cart.getAddress(), cart.getStatus(), cart.getPrice(), cart.getPhone(),productDtoList);
    }

}