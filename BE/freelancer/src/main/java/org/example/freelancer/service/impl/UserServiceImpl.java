package org.example.freelancer.service.Impl;

import org.example.freelancer.dto.EduInfoFreelancerDTO;
import org.example.freelancer.dto.InfoFreelancerDTO;
import org.example.freelancer.dto.SkillDTO;
import org.example.freelancer.dto.UserDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.mapper.UserMapper;
import org.example.freelancer.entity.User;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.repository.FreelancerRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;


    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper.INSTANCE::userToUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.INSTANCE.userDTOToUser(userDTO);
        System.out.print("\"'vao duoc dy");
        System.out.println(user.toString());
        User savedUser = userRepository.save(user);
        return UserMapper.INSTANCE.userToUserDTO(savedUser);
    }

    @Override
    public Optional<UserDTO> getUserById(Integer id) {
        return userRepository.findById(id)
                .map(UserMapper.INSTANCE::userToUserDTO);
    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        // Nếu có một Account, có thể lấy từ ID và gán
        if(userDTO.getAccountId() != null) {
            user.setAccount(accountRepository.findById(userDTO.getAccountId()).orElse(null));
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.INSTANCE.userToUserDTO(updatedUser);
    }

    @Override
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found.");
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<InfoFreelancerDTO> findAllFreelancers() {
        List<Object[]> results = getAllInfoFreelancers(); // Lấy dữ liệu freelancer từ repository
        Map<Integer, InfoFreelancerDTO> freelancerMap = new HashMap<>(); // Sử dụng Map để nhóm theo freelancerId

        for (Object[] result : results) {
            Integer freelancerId = (Integer) result[0];

            // Kiểm tra nếu freelancer đã tồn tại trong Map
            InfoFreelancerDTO infoFreelancerDTO = freelancerMap.get(freelancerId);
            if (infoFreelancerDTO == null) {
                // Tạo mới InfoFreelancerDTO và thêm vào Map
                infoFreelancerDTO = InfoFreelancerDTO.builder()
                        .freelancerId(freelancerId)
                        .firstName((String) result[2])
                        .lastName((String) result[3])
                        .address((String) result[4])
                        .image((String) result[1])
                        .categoryId((Integer) result[5])
                        .categoryTitle((String) result[6])
                        .skills(new ArrayList<>()) // Khởi tạo danh sách kỹ năng
                        .eduInfoFreelancerDTOList(getEducationDetailsForFreelancer(freelancerId)) // Lấy thông tin giáo dục
                        .build();

                freelancerMap.put(freelancerId, infoFreelancerDTO);
            }

            // Thêm kỹ năng vào danh sách kỹ năng của freelancer
            SkillDTO skillDTO = new SkillDTO();
            skillDTO.setId((Integer) result[7]);
            skillDTO.setSkillName((String) result[8]);
            infoFreelancerDTO.getSkills().add(skillDTO);
        }

        return new ArrayList<>(freelancerMap.values()); // Trả về danh sách các freelancer
    }


    // Phương thức lấy danh sách thông tin giáo dục của một freelancer dựa trên freelancerId
    private List<EduInfoFreelancerDTO> getEducationDetailsForFreelancer(Integer freelancerId) {
        List<Object[]> eduResults = userRepository.getEducationDetailsForFreelancer(freelancerId);  // Lấy dữ liệu giáo dục từ DB
        List<EduInfoFreelancerDTO> eduInfoList = new ArrayList<>();

        for (Object[] eduResult : eduResults) {
            EduInfoFreelancerDTO eduInfo = new EduInfoFreelancerDTO(
                    (Integer) eduResult[0],         // educationId
                    (String) eduResult[1],          // schoolName
                    (Date) eduResult[2],            // dateStart
                    (Date) eduResult[3],            // dateEnd
                    (String) eduResult[4],          // description
                    (String) eduResult[5],          // majorName
                    (String) eduResult[6]           // degreeName
            );
            eduInfoList.add(eduInfo);
        }

        return eduInfoList;
    }



    public List<Object[]> getAllInfoFreelancers() {
        try {
            return userRepository.findAllFreelancers();
        }catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
