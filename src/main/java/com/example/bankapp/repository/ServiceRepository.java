package com.example.bankapp.repository;

import com.example.bankapp.entity.BankService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<BankService, Long> {
}

