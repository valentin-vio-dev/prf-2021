package com.example.prf2021.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.prf2021.models.product.Product;
import com.example.prf2021.models.product.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class ProductController {
    
    ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(path="/products/add", consumes = "application/json")
    public String addNewProduct(@RequestBody Product product) {
        if (!product.allRequiredSet()) {
            return "Some fileds are missing!";
        }

        try {
            List<Product> products = this.productService.getAllProduct();

            for (Product p: products) {
                if (p.getName() != null && p.getName().equals(product.getName())) {
                    return "Product already exists!";
                }
            }
        } catch (Exception e) {}
        
        try {
            this.productService.addProduct(product);
            return "Product added!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error!";
        }
    }

    @GetMapping("/products/getall")
    public List<Product> getAllProducts() {
        try {
            return this.productService.getAllProduct();
        } catch (Exception e) {
            System.out.println(e);
            return new ArrayList<>();
        }
    }

    @GetMapping("/products/byid")
    public Product getProductById(@RequestParam int id) {
        try {
            return this.productService.getProductById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/products/deletebyid")
    public String deleteProductById(@RequestParam int id) {
        try {
            this.productService.deleteProductById(id);
            return "Delete Successful!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during deletion!";
        }
    }

    @PutMapping(path="/products/update", consumes = "application/json")
    public String updateProduct(@RequestBody Product product) {
        try {
            this.productService.updateProduct(product);
            return "Update Successful!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error!";
        }
    }

}
