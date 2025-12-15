package com.example.bankapp.dto;

import java.math.BigDecimal;

public class AccountDto {

    private Long id;
    private String accountNumber;
    private BigDecimal balance;

    public AccountDto(Long id, String accountNumber, BigDecimal balance) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }
}

