package com.example.bankapp.service;

import com.example.bankapp.entity.BankService;
import com.example.bankapp.repository.ServiceRepository;
import org.springframework.stereotype.Service;

@Service
public class BankServiceService {

    private final ServiceRepository repository;

    public BankServiceService(ServiceRepository repository) {
        this.repository = repository;
    }

    public BankService getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
    }
}


