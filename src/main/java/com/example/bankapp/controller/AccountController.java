package com.example.bankapp.controller;

import com.example.bankapp.dto.AccountDto;
import com.example.bankapp.entity.User;
import com.example.bankapp.service.AccountService;
import com.example.bankapp.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.example.bankapp.entity.Account;


import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;

    public AccountController(AccountService accountService,
                             UserService userService) {
        this.accountService = accountService;
        this.userService = userService;
    }

    // ===== CREATE ACCOUNT =====
    @PostMapping("/create/{userId}")
    public AccountDto createAccount(@PathVariable Long userId) {
        if (userId == null) {
            throw new RuntimeException("User id is required");
        }

        User user = userService.getUserById(userId);
        var account = accountService.createAccount(user);

        return new AccountDto(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance()
        );
    }

    // ===== GET USER ACCOUNTS =====
    @GetMapping("/user/{userId}")
    public List<AccountDto> getUserAccounts(@PathVariable Long userId) {
        if (userId == null) {
            throw new RuntimeException("User id is required");
        }

        return accountService.getUserAccounts(userId);
    }

    // ===== GET BALANCE =====
    @GetMapping("/{accountId}/balance")
    public BigDecimal getBalance(@PathVariable Long accountId) {
        if (accountId == null) {
            throw new RuntimeException("Account id is required");
        }

        return accountService.getBalance(accountId);
    }
    @GetMapping
    public List<AccountDto> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/by-number/{accountNumber}")
    public AccountDto getByAccountNumber(@PathVariable String accountNumber) {

        Account account = accountService.getByAccountNumber(accountNumber);

        return new AccountDto(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance()
        );
    }


}




