package com.example.bankapp.controller;

import com.example.bankapp.dto.TransactionDto;
import com.example.bankapp.dto.TransferRequestDto;
import com.example.bankapp.entity.Account;
import com.example.bankapp.exception.BadRequestException;
import com.example.bankapp.service.AccountService;
import com.example.bankapp.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    public TransactionController(TransactionService transactionService,
                                 AccountService accountService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    // ===== DEPOSIT =====
    @PostMapping("/deposit/{accountId}")
    public String deposit(@PathVariable Long accountId,
                          @RequestParam BigDecimal amount) {

        validateAmount(amount);

        Account account = accountService.getAccountById(accountId);
        transactionService.deposit(account, amount);

        return "Deposit successful";
    }

    // ===== WITHDRAW =====
    @PostMapping("/withdraw/{accountId}")
    public String withdraw(@PathVariable Long accountId,
                           @RequestParam BigDecimal amount) {

        validateAmount(amount);

        Account account = accountService.getAccountById(accountId);

        if (account.getBalance().compareTo(amount) < 0) {
            throw new BadRequestException("Insufficient funds");
        }

        transactionService.withdraw(account, amount);
        return "Withdraw successful";
    }

    // ===== TRANSFER =====
    @PostMapping("/transfer")
    public String transfer(@RequestBody TransferRequestDto dto) {

        validateAmount(dto.getAmount());

        if (dto.getFromAccountId().equals(dto.getToAccountId())) {
            throw new BadRequestException("Cannot transfer to the same account");
        }

        Account from = accountService.getAccountById(dto.getFromAccountId());
        Account to = accountService.getAccountById(dto.getToAccountId());

        if (from.getBalance().compareTo(dto.getAmount()) < 0) {
            throw new BadRequestException("Insufficient funds");
        }

        transactionService.transfer(from, to, dto.getAmount());
        return "Transfer successful";
    }

    // ===== HISTORY =====
    @GetMapping("/account/{accountId}")
    public List<TransactionDto> getByAccount(@PathVariable Long accountId) {
        return transactionService.getByAccount(accountId);
    }

    // ===== VALIDATION =====
    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Amount must be greater than zero");
        }
    }
    @GetMapping
    public List<TransactionDto> getAll() {
        return transactionService.getAll();
    }

}








