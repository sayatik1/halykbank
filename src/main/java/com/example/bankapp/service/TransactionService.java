package com.example.bankapp.service;

import com.example.bankapp.dto.TransactionDto;
import com.example.bankapp.entity.Account;
import com.example.bankapp.entity.Transaction;
import com.example.bankapp.repository.AccountRepository;
import com.example.bankapp.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    // ===== POPOLNENIE =====
    @Transactional
    public void deposit(Account account, BigDecimal amount) {
        validateAmount(amount);

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        transactionRepository.save(
                new Transaction(amount, "DEPOSIT", account)
        );
    }

    // ===== SPISANIE =====
    @Transactional
    public void withdraw(Account account, BigDecimal amount) {
        validateAmount(amount);
        validateEnoughBalance(account, amount);

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        transactionRepository.save(
                new Transaction(amount, "WITHDRAW", account)
        );
    }

    // ===== PEREVOD =====
    @Transactional
    public void transfer(Account from, Account to, BigDecimal amount) {
        validateAmount(amount);

        if (from.getId().equals(to.getId())) {
            throw new RuntimeException("Cannot transfer to the same account");
        }

        validateEnoughBalance(from, amount);

        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));

        accountRepository.save(from);
        accountRepository.save(to);

        transactionRepository.save(
                new Transaction(amount, "TRANSFER_OUT", from)
        );
        transactionRepository.save(
                new Transaction(amount, "TRANSFER_IN", to)
        );
    }

    // ===== HISTORY =====
    public List<TransactionDto> getByAccount(Long accountId) {
        return transactionRepository.findByAccountId(accountId)
                .stream()
                .map(t -> new TransactionDto(
                        t.getId(),
                        t.getAmount(),
                        t.getType(),
                        t.getCreatedAt()
                ))
                .toList();
    }

    // ===== VALIDATIONS =====
    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }
    }

    private void validateEnoughBalance(Account account, BigDecimal amount) {
        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }
    }
    public List<TransactionDto> getAll() {
        return transactionRepository.findAll()
                .stream()
                .map(t -> new TransactionDto(
                        t.getId(),
                        t.getAmount(),
                        t.getType(),
                        t.getCreatedAt()
                ))
                .toList();
    }

}








