package com.example.prf2021.models.transaction;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int product_id;
    private Date date;
    private int full_price;
    private String status;
    private String customer;
    private String customer_id;

    public Transaction() {}

    public Transaction(int id, int product_id, Date date, int full_price, String status, String customer, String customer_id) {
        this.id = id;
        this.product_id = product_id;
        this.date = date;
        this.full_price = full_price;
        this.status = status;
        this.customer = customer;
        this.customer_id = customer_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getFull_price() {
        return full_price;
    }

    public void setFull_price(int full_price) {
        this.full_price = full_price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public boolean allRequiredSet() {
        return date != null && full_price != 0 && product_id != 0 && customer != null && !customer.equals("") && customer_id != null && !customer_id.equals("");
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(String customer_id) {
        this.customer_id = customer_id;
    }

    @Override
    public String toString() {
        return "Transaction [customer=" + customer + ", date=" + date + ", full_price=" + full_price + ", id=" + id
                + ", product_id=" + product_id + ", status=" + status + "]";
    }
    
}
