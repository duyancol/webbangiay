package com.example.demo.reposity;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
   @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems WHERE c.userID = :id")
   List<Cart> findByUserID(@PathVariable("userID") String id);

   @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems WHERE c.id = :id")
   List<Cart> findByUserCartID(@PathVariable("id") String id);
}
