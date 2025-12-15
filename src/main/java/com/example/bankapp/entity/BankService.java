package com.example.bankapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class BankService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    // ===== Constructors =====
    public BankService() {
    }

    public BankService(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // ===== Getters & Setters =====
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
