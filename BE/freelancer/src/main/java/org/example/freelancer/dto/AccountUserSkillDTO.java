package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.freelancer.entity.Skill;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountUserSkillDTO {
    private Integer accountId;
    private String email;
    private String role;
    private Boolean status;

    private Integer userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;

    private Integer freelancerId;
    private String image;
    private BigDecimal hourlyRate;

    // Sửa kiểu dữ liệu của 'skills' thành List<Skill> để chứa danh sách kỹ năng
    private List<String> skills;
}
