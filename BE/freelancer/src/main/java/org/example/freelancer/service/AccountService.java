package org.example.freelancer.service;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.entity.Account;
import org.example.freelancer.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<AccountDTO> getAllAccounts();
    AccountDTO createAccount(AccountDTO accountDTO);
    Optional<AccountDTO> getAccountById(Integer id);
    AccountDTO updateAccount(Integer id, AccountDTO accountDTO);
    void deleteAccount(Integer id);
    void changeAccountStatus(Integer id, Boolean status);
}