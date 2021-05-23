package com.example.prf2021.models.product;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String manufacturer;
    private int price;
    private double alcohol;
    private boolean available;
    private String description;
    private String image;
    
    public Product() {}

    public Product(int id, String name, String manufacturer, int price, double alcohol, boolean available, String description, String image) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
        this.alcohol = alcohol;
        this.available = available;
        this.description = description;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public double getAlcohol() {
        return alcohol;
    }

    public void setAlcohol(double alcohol) {
        this.alcohol = alcohol;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean allRequiredSet() {
        return name != null && !name.equals("") && manufacturer != null && !manufacturer.equals("");
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void copy(Product product) {
        this.name = product.getName();
        this.manufacturer = product.getManufacturer();
        this.price = product.getPrice();
        this.alcohol = product.getAlcohol();
        this.available = product.isAvailable();
        this.description = product.getDescription();
        this.image = product.getImage();
    }

    @Override
    public String toString() {
        return "Product [alcohol=" + alcohol + ", available=" + available + ", description=" + description + ", id="
                + id + ", manufacturer=" + manufacturer + ", name=" + name + ", price=" + price + "]";
    }
}
