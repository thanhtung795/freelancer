package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO {

    @NotNull(message = "Skill ID không được để trống")
    private Integer id;
    @NotBlank(message = "Tên kỹ năng không được để trống")
    private String skillName;
}
