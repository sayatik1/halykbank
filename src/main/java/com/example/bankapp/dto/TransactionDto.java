package com.example.bankapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDto {

    private Long id;
    private BigDecimal amount;
    private String type;
    private LocalDateTime createdAt;

    public TransactionDto(Long id, BigDecimal amount, String type, LocalDateTime createdAt) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public BigDecimal getAmount() { return amount; }
    public String getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

