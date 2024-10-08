package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.RegisterDTO;
import org.example.freelancer.entity.Account;
import org.example.freelancer.entity.Client;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.User;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.mapper.UserMapper;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.repository.ClientRepository;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.RegisterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;


    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final ClientRepository clientRepository;

    private final FreelancerRepository freelancerRepository;

    @Override
    @Transactional  // Đánh dấu phương thức này là transaction
    public RegisterDTO registerAccount(RegisterDTO registerDTO) {
        // Lưu tài khoản
        Account account = new Account();
        account.setEmail(registerDTO.getEmail());
        account.setPassword(registerDTO.getPassword());
        account.setRole(registerDTO.getRole());
        account.setStatus(registerDTO.getStatus());

        account = accountRepository.save(account); // Lưu tài khoản và lấy lại đối tượng đã lưu

        // Lưu người dùng
        User user = new User();
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setPhoneNumber(registerDTO.getPhoneNumber());
        user.setAddress(registerDTO.getAddress());
        user.setAccount(account);  // Liên kết tài khoản với người dùng

        userRepository.save(user); // Lưu người dùng

        if (registerDTO.getRole().equals("client")) {
            Client client = new Client();
            client.setUser(user);
            clientRepository.save(client);
        } else if (registerDTO.getRole().equals("freelancer")) {
            Freelancer freelancer = new Freelancer();
            freelancer.setUser(user);
            freelancerRepository.save(freelancer);
        }
        // Trả về RegisterDTO hoặc thông tin khác nếu cần
        return registerDTO; // Bạn có thể điều chỉnh dữ liệu trả về nếu cần
    }
}
