package com.example.prf2021.models.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void addProduct(Product product) {
        this.productRepository.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return this.productRepository.findAll();
    }

    @Override
    public Product getProductById(int id) {
        return this.productRepository.findById(id).get();
    }

    @Override
    public void deleteProductById(int id) {
        this.productRepository.deleteById(id);
    }

    @Override
    public void updateProduct(Product product) {
        Product current = this.productRepository.findById(product.getId()).get();
        current.copy(product);
        this.productRepository.save(current);
    }
    
}
