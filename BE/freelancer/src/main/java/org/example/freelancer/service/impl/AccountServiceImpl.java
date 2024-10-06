package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.entity.*;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    private final AccountMapper accountMapper; // Inject mapper từ Spring

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
    public Boolean changeAccountStatus(Boolean status, Integer id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found."));
        account.setStatus(status);
        accountRepository.save(account);
        return true;
    }

    //
    @Override
    public List<AccountUserSkillDTO> findAccountUserAndSkills() {
        List<Object[]> results = accountRepository.findAllFreelancersWithSkills();  // Lấy dữ liệu từ truy vấn
        List<AccountUserSkillDTO> dtoList = new ArrayList<>();
        Map<Integer, AccountUserSkillDTO> freelancerMap = new HashMap<>();  // Để theo dõi các freelancer và kỹ năng của họ

        // Lặp qua kết quả của truy vấn
        for (Object[] result : results) {
            User user = (User) result[0];  // Lấy User
            Account account = (Account) result[1];  // Lấy Account
            FreelancerSkill freelancerSkill = (FreelancerSkill) result[2];  // Lấy FreelancerSkill
            Skill skill = freelancerSkill.getSkill();  // Lấy Skill từ FreelancerSkill

            // Kiểm tra nếu freelancer đã được thêm vào danh sách
            int freelancerId = user.getFreelancer().getId();
            AccountUserSkillDTO accountUserSkillDTO = freelancerMap.get(freelancerId);

            if (accountUserSkillDTO == null) {
                // Nếu freelancer chưa có trong map, tạo một DTO mới
                accountUserSkillDTO = new AccountUserSkillDTO();
                accountUserSkillDTO.setAccountId(account.getId());
                accountUserSkillDTO.setEmail(account.getEmail());
                accountUserSkillDTO.setRole(account.getRole());
                accountUserSkillDTO.setStatus(account.getStatus());

                accountUserSkillDTO.setUserId(user.getId());
                accountUserSkillDTO.setFirstName(user.getFirstName());
                accountUserSkillDTO.setLastName(user.getLastName());
                accountUserSkillDTO.setPhoneNumber(user.getPhoneNumber());
                accountUserSkillDTO.setAddress(user.getAddress());

                Freelancer freelancer = user.getFreelancer();
                accountUserSkillDTO.setFreelancerId(freelancer.getId());
                accountUserSkillDTO.setImage(freelancer.getImage());
                accountUserSkillDTO.setHourlyRate(freelancer.getHourlyRate());

                // Khởi tạo danh sách kỹ năng
                accountUserSkillDTO.setSkills(new ArrayList<>());

                // Thêm freelancer vào map
                freelancerMap.put(freelancerId, accountUserSkillDTO);
            }

            // Thêm tên kỹ năng vào danh sách kỹ năng của freelancer
            accountUserSkillDTO.getSkills().add(skill.getSkillName());
        }

        // Chuyển đổi map thành danh sách DTO
        dtoList.addAll(freelancerMap.values());

        return dtoList;  // Trả về danh sách DTO
    }


    @Override
    public AccountDTO login(String email, String password) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // In a real application, you should use password encryption/hashing
        if (!account.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        return AccountMapper.INSTANCE.accountToAccountDTO(account);
    }

}
