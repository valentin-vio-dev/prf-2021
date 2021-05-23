package com.example.prf2021.models.product;

import java.util.List;

public interface ProductService {
    void addProduct(Product product);
    List<Product> getAllProduct();
    Product getProductById(int id);
    void deleteProductById(int id);
    void updateProduct(Product product);
}
