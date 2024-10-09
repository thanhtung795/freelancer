package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountRoleDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.entity.*;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.repository.ClientRepository;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    private final UserRepository userRepository;

    private final FreelancerRepository freelancerRepository;

    private final ClientRepository clientRepository;

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
/*
*  Phương thức findAccountUserAndSkills nay sẽ lấy dự liệu từ ĐB lên
* sau đó sẽ lấy dự iệu đực truy vấn lên map với AccountUserSkillDTO
*sau  sẽ trả về 1 list AccountUserSkillDTO
* */
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
            accountUserSkillDTO.setCreatedAt(user.getCreatedAt());

            Freelancer freelancer = user.getFreelancer();
            accountUserSkillDTO.setFreelancerId(freelancer.getId());
            accountUserSkillDTO.setImage(freelancer.getImage());
            accountUserSkillDTO.setHourlyRate(freelancer.getHourlyRate());

            // Khởi tạo danh sách kỹ năng chỉ nếu role không phải là client hoặc admin
            if (!account.getRole().equals("client") && !account.getRole().equals("admin")) {
                accountUserSkillDTO.setSkills(new ArrayList<>());
            }

            // Thêm freelancer vào map
            freelancerMap.put(freelancerId, accountUserSkillDTO);
        }

        // Chỉ thêm kỹ năng nếu role không phải là client hoặc admin
        if (!account.getRole().equals("client") && !account.getRole().equals("admin")) {
            accountUserSkillDTO.getSkills().add(skill.getSkillName());
        }
    }

    // Chuyển đổi map thành danh sách DTO
    dtoList.addAll(freelancerMap.values());

    return dtoList;  // Trả về danh sách DTO
}

    @Override
    public AccountRoleDTO login(String email, String password) {
        // Tìm tài khoản theo email
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Kiểm tra mật khẩu
        if (!account.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        // Khởi tạo AccountDTO từ Account
        AccountRoleDTO accountDTO = AccountMapper.INSTANCE.accountToAccountRoleDTO(account);

        // Tìm User theo account ID
        User user = userRepository.findById(accountDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("id user la: " + user.getId());

        if ("client".equals(account.getRole())) {
            // Tìm Client dựa trên user ID
            Client client = clientRepository.getReferenceById(user.getId());
            if (client != null) {
                System.out.println("id client la: " + client.getId());
                accountDTO.setIdRole(client.getId());
            } else {
                throw new RuntimeException("Client not found");
            }
        } else if ("freelancer".equals(account.getRole())) {
            System.out.println("role user la: " + accountDTO.getRole());
            try {
                Freelancer freelancer  = freelancerRepository.getReferenceById(user.getId());
                if (freelancer != null) {
                    System.out.println("id freelancer la: " + freelancer.getId());
                    accountDTO.setIdRole(freelancer.getId());
                } else {
                    throw new RuntimeException("Freelancer not found");
                }
            }catch (Exception e) {
                throw new RuntimeException("Freelancer not found");
            }
        }

        // Trả về AccountDTO sau khi đã thiết lập idRole
        return accountDTO;
    }


}
