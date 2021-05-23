package com.example.prf2021.models.transaction;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    TransactionRepository transactionRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void addTransaction(Transaction transaction) {
        transaction.setStatus("pending");
        this.transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransaction() {
        return this.transactionRepository.findAll();
    }

    @Override
    public void completeTransaction(int id) {
        Transaction transaction = this.transactionRepository.findById(id).get();
        transaction.setStatus("shipped");
        this.transactionRepository.save(transaction);
    }
    
}
