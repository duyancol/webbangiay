package com.example.demo.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductDao  extends JpaRepository<Product,Integer> {
    @Query("SELECT un FROM Product un ORDER BY un.id  LIMIT 3  ")
    List<Product> load3ProductNew();

    @Query(
            value = "SELECT * FROM product u ORDER BY u.id LIMIT ?1 offset ?2 ",
            nativeQuery = true)
    public List<Product> load3ProductNext(@Param("limit") int limit, @Param("ex") int count);
}
