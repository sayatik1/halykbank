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

    @Transactional
    public Account createAccount(User user) {
        Account account = new Account();
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);
        account.setAccountNumber("ACC-" + UUID.randomUUID().toString().substring(0, 8));
        return accountRepository.save(account);
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<AccountDto> getUserAccounts(Long userId) {
        return accountRepository.findByUserId(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public void delete(Account account) {
        accountRepository.delete(account);
    }

    private AccountDto toDto(Account a) {
        return new AccountDto(
                a.getId(),
                a.getAccountNumber(),
                a.getBalance(),
                a.getUser().getId(),
                a.getTransactions() == null ? 0 : a.getTransactions().size()
        );
    }
}











