package com.example.bankapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ===== RELATION: LOG -> USER =====
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ===== Constructors =====
    public AuditLog() {
        this.createdAt = LocalDateTime.now();
    }

    public AuditLog(String action, User user) {
        this.action = action;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    // ===== Getters & Setters =====
    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
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
}
