package com.example.demo.Entity;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<user,Integer> {
//    @Query("SELECT u FROM user u ")
//    List<user> findCate();

    @Query("SELECT un FROM user un ORDER BY un.id  LIMIT 3  ")
    List<user> findCate();

    @Query(
            value = "SELECT * FROM users u ORDER BY u.id LIMIT ?1 offset ?2 ",
            nativeQuery = true)
    public List<user> findByName(@Param("limit") int limit,@Param("ex") int count);

    @Query("SELECT t FROM user t WHERE t.email = ?1 ")
    Optional<user> findByEmail(String email);



}
