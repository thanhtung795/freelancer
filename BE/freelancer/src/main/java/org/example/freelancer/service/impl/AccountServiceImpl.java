package org.example.freelancer.service.impl;


import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.entity.Account;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;


    @Override
    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(account -> new AccountDTO(
                        account.getId(),
                        account.getEmail(),
                        account.getRole(),
                        account.getPassword(),
                        account.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public AccountDTO createAccount(AccountDTO accountDTO) {
        if (accountRepository.existsByEmail(accountDTO.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        Account account = AccountMapper.INSTANCE.accountDTOToAccount(accountDTO);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.INSTANCE.accountToAccountDTO(savedAccount);
    }

    @Override
    public Optional<AccountDTO> getAccountById(Integer id) {
        return accountRepository.findById(id)
                .map(AccountMapper.INSTANCE::accountToAccountDTO);
    }

    @Override
    public AccountDTO updateAccount(Integer id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found."));

        account.setEmail(accountDTO.getEmail());
        account.setPassword(accountDTO.getPassword());
        account.setRole(accountDTO.getRole());
        account.setStatus(accountDTO.getStatus());

        Account updatedAccount = accountRepository.save(account);
        return AccountMapper.INSTANCE.accountToAccountDTO(updatedAccount);
    }

    @Override
    public void deleteAccount(Integer id) {
        if (!accountRepository.existsById(id)) {
            throw new RuntimeException("Account not found.");
        }
        accountRepository.deleteById(id);
    }

    @Override
    public void changeAccountStatus(Integer id, Boolean status) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found."));

        account.setStatus(status);
        accountRepository.save(account);
    }
}
