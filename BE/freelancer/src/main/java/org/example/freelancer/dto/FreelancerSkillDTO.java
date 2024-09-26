package org.example.freelancer.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerSkillDTO {
    private Integer freelancerId; // ID của freelancer
    private Integer skillId;      // ID của kỹ năng
}
