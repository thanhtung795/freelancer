package org.example.freelancer.service;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountRoleDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<AccountDTO> getAllAccounts();

    AccountDTO createAccount(AccountDTO accountDTO);

    Optional<AccountDTO> getAccountById(Integer id);

    AccountDTO updateAccount(Integer id, AccountDTO accountDTO);

    void deleteAccount(Integer id);

    List<AccountUserSkillDTO> findAccountUserAndSkills();

    Boolean changeAccountStatus(Boolean status, Integer id);

    AccountDTO login(String email, String password);

    void exportAccountsToExcel(List<AccountUserSkillDTO> accountUserSkillDTOs, ByteArrayOutputStream filePath);

    void exportAccountsToPDF(List<AccountUserSkillDTO> accountUserSkillDTOs, ByteArrayOutputStream outputStream);
}
