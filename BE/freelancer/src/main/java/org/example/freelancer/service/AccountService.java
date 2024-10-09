package org.example.freelancer.service;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountRoleDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<AccountDTO> getAllAccounts();
    Optional<AccountDTO> getAccountById(Integer id);
    AccountDTO updateAccount(Integer id, AccountDTO accountDTO);
    void deleteAccount(Integer id);
    List<AccountUserSkillDTO> findAccountUserAndSkills();
    Boolean changeAccountStatus(Boolean status, Integer id);
    AccountRoleDTO login(String email, String password);
}
