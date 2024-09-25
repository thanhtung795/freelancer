package org.example.freelancer.service;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.model.Account;
import org.example.freelancer.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public AccountDTO createAccount(AccountDTO accountDTO) {
        if (accountRepository.existsByEmail(accountDTO.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        Account account = AccountMapper.INSTANCE.accountDTOToAccount(accountDTO);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.INSTANCE.accountToAccountDTO(savedAccount);
    }

    public Optional<AccountDTO> getAccountById(Long id) {
        return accountRepository.findById(id)
                .map(AccountMapper.INSTANCE::accountToAccountDTO);
    }

}
