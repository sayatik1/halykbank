package com.example.bankapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String status; // NEW, APPROVED, REJECTED

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ===== RELATION: REQUEST -> USER =====
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ===== RELATION: REQUEST -> SERVICE =====
    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private BankService service;

    // ===== Constructors =====
    public ServiceRequest() {
        this.createdAt = LocalDateTime.now();
        this.status = "NEW";
    }

    public ServiceRequest(User user, BankService service) {
        this.user = user;
        this.service = service;
        this.status = "NEW";
        this.createdAt = LocalDateTime.now();
    }

    // ===== Getters & Setters =====
    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BankService getService() {
        return service;
    }

    public void setService(BankService service) {
        this.service = service;
    }
}
