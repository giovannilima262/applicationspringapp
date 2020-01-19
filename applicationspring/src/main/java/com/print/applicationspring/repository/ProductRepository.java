package com.print.applicationspring.repository;

import com.print.applicationspring.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select p from Product p where p.user.id = :id order by p.id")
    List<Product> findAllByIdUser(Long id);
}
