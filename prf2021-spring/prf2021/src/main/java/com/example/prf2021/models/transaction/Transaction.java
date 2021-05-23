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

    public Transaction() {}

    public Transaction(int id, int product_id, Date date, int full_price, String status) {
        this.id = id;
        this.product_id = product_id;
        this.date = date;
        this.full_price = full_price;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getfull_price() {
        return full_price;
    }

    public void setfull_price(int full_price) {
        this.full_price = full_price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getproduct_id() {
        return product_id;
    }

    public void setproduct_id(int product_id) {
        this.product_id = product_id;
    }

    public boolean allRequiredSet() {
        return date != null && full_price != 0 && product_id != 0;
    }

    @Override
    public String toString() {
        return "Transaction [date=" + date + ", full_price=" + full_price + ", id=" + id + ", product_id=" + product_id
                + ", status=" + status + "]";
    }

    
    

    
}
