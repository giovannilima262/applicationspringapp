package com.print.applicationspring.service;

import com.print.applicationspring.model.Product;
import com.print.applicationspring.model.User;
import com.print.applicationspring.repository.ProductRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService = new ProductService();

    @Test
    public void testSave() {
        Product product = oneProduct();
        productService.save(product);
        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void testDelete() {
        productService.delete(1L);
        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testFindAllByIdUser() {
        productService.findAllByIdUser(1L);
        verify(productRepository, times(1)).findAllByIdUser(1L);
    }

    @Test
    public void testFindAllByIdUserReturnOne() {
        Product product = oneProduct();
        List<Product> productListResult = Collections.singletonList(product);
        when(productRepository.findAllByIdUser(1L)).thenReturn(productListResult);
        List<Product> productList = productService.findAllByIdUser(1L);
        assertEquals(productList, productListResult);
    }

    @Test
    public void testFindById() {
        productService.findById(1L);
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    public void testFindByIdReturnOne() {
        Product product = oneProduct();
        Optional<Product> productOptionalResult = Optional.of(product);
        when(productRepository.findById(1L)).thenReturn(productOptionalResult);
        Optional<Product> productOptional = productService.findById(1L);
        assertEquals(productOptional, productOptionalResult);
    }

    private Product oneProduct() {
        Product product = new Product();
        product.setId(1L);
        product.setDescription("Teste");
        product.setName("Teste");
        product.setPrice(30.3);
        User user = new User();
        user.setId(1L);
        product.setUser(user);
        return product;
    }
}
