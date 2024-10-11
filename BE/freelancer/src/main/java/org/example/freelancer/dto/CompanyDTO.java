package org.example.freelancer.dto;

import lombok.Data;
import org.example.freelancer.entity.Client;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CompanyDTO {
    private Integer id;

    @NotBlank(message = "Tên công ty không được để trống")
    private String companyName;

    @NotBlank(message = "Số điện thoại liên hệ không được để trống")
    @Size(max = 20, message = "Số điện thoại liên hệ phải có tối đa 20 ký tự")
    private String phoneContact;

    private String address;

    private String location;

    private String description;
    private Integer clientId;
}
