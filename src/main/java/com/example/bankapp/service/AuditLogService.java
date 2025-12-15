package com.example.bankapp.service;

import com.example.bankapp.entity.AuditLog;
import com.example.bankapp.entity.User;
import com.example.bankapp.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public AuditLog logAction(String action, User user) {
        AuditLog log = new AuditLog(action, user);
        return auditLogRepository.save(log);
    }

    public List<AuditLog> getUserLogs(Long userId) {
        return auditLogRepository.findByUserId(userId);
    }
}

