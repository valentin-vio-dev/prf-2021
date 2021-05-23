package com.example.prf2021.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.prf2021.models.transaction.Transaction;
import com.example.prf2021.models.transaction.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
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
public class TransactionController {

    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/transactions/getall")
    public List<Transaction> getAllProducts() {
        try {
            return this.transactionService.getAllTransaction();
        } catch (Exception e) {
            System.out.println(e);
            return new ArrayList<>();
        }
    }

    @PostMapping(path="/transactions/add", consumes = "application/json")
    public String addNewTransaction(@RequestBody Transaction transaction) {
        if (!transaction.allRequiredSet()) {
            return "Some fileds are missing!";
        }

        try {
            this.transactionService.addTransaction(transaction);
            return "Transaction added!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error!";
        }
    }

    @PutMapping(path="/transactions/complete")
    public String completeTransaction(@RequestParam int id) {
        try {
            this.transactionService.completeTransaction(id);
            return "Transaction status changed!";
        } catch (Exception e) {
            System.out.println(e);
            return "Error!";
        }
    }
}
