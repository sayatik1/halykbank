package com.example.bankapp.controller;

import com.example.bankapp.dto.AccountDto;
import com.example.bankapp.entity.Account;
import com.example.bankapp.entity.User;
import com.example.bankapp.service.AccountService;
import com.example.bankapp.service.UserService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create/{userId}")
    public AccountDto create(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        Account account = accountService.createAccount(user);

        return new AccountDto(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                userId,
                0
        );
    }

    @GetMapping
    public List<AccountDto> getAll() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/user/{userId}")
    public List<AccountDto> byUser(@PathVariable Long userId) {
        return accountService.getUserAccounts(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Account account = accountService.getAccountById(id);

        if (account.getTransactions() != null && !account.getTransactions().isEmpty()) {
            throw new RuntimeException("Account has transactions");
        }

        accountService.delete(account);
    }
}








