package com.example.prf2021.models.transaction;

import java.util.List;

public interface TransactionService {
    void addTransaction(Transaction transaction);
    List<Transaction> getAllTransaction();  
    void completeTransaction(int id);
}
