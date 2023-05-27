package com.example.demo.reposity;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository  extends JpaRepository<Feedback,Long> {
}
