package com.example.demo.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductDao  extends JpaRepository<Product,Integer> {
    @Query("SELECT un FROM Product un ORDER BY un.id  LIMIT 9  ")
    List<Product> load3ProductNew();
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN 10 AND 20")
    List<Product> findProductsInRange10_20();

    @Query("SELECT un FROM Product un ORDER BY un.id  ")
    List<Product> loadAllproduct();

    @Query(
            value = "SELECT * FROM product u ORDER BY u.id LIMIT ?1 offset ?2 ",
            nativeQuery = true)
    public List<Product> load3ProductNext(@Param("limit") int limit, @Param("ex") int count);


    @Query(
            value = "SELECT * FROM product where id=?1 ",
            nativeQuery = true)
    public Product getProductById(@Param("id") int id);
}
