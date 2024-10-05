package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountUserSkillDTO {
    private Long accountId;
    private String email;
    private String role;
    private String status;
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private Long freelancerId;
    private String image;
    private Double hourlyRate;
    private Long skillId;
    private String skillName;
}
