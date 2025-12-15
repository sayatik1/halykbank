package com.example.bankapp.service;

import com.example.bankapp.dto.AccountDto;
import com.example.bankapp.entity.Account;
import com.example.bankapp.entity.User;
import com.example.bankapp.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // ===== CREATE =====
    @Transactional
    public Account createAccount(User user) {
        if (user == null || user.getId() == null) {
            throw new RuntimeException("User must exist");
        }

        Account account = new Account();
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);
        account.setAccountNumber(generateAccountNumber());

        return accountRepository.save(account);
    }

    // ===== INTERNAL =====
    public Account getAccountById(Long id) {
        if (id == null) {
            throw new RuntimeException("Account id is required");
        }

        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    // ===== DTO RETURN =====
    public List<AccountDto> getUserAccounts(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User id is required");
        }

        return accountRepository.findByUserId(userId)
                .stream()
                .map(a -> new AccountDto(
                        a.getId(),
                        a.getAccountNumber(),
                        a.getBalance()
                ))
                .toList();
    }

    // ===== BALANCE =====
    public BigDecimal getBalance(Long accountId) {
        return getAccountById(accountId).getBalance();
    }

    // ===== UTIL =====
    private String generateAccountNumber() {
        return "ACC-" + UUID.randomUUID().toString().substring(0, 10);
    }

    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(a -> new AccountDto(
                        a.getId(),
                        a.getAccountNumber(),
                        a.getBalance()
                ))
                .toList();
    }

}






