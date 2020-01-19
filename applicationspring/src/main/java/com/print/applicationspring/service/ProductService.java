package com.print.applicationspring.service;

import com.print.applicationspring.model.Product;
import com.print.applicationspring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void save(Product product) {
        productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> findAllByIdUser(Long id) {
        return productRepository.findAllByIdUser(id);
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

}
