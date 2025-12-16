package com.example.bankapp.dto;

import java.math.BigDecimal;

public class AccountDto {

    private Long id;
    private String accountNumber;
    private BigDecimal balance;
    private Long userId;
    private int transactionsCount;

    public AccountDto(
            Long id,
            String accountNumber,
            BigDecimal balance,
            Long userId,
            int transactionsCount
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.userId = userId;
        this.transactionsCount = transactionsCount;
    }

    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public BigDecimal getBalance() { return balance; }
    public Long getUserId() { return userId; }
    public int getTransactionsCount() { return transactionsCount; }
}





