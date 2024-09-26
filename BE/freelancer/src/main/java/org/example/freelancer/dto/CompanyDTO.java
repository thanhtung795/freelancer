package org.example.freelancer.dto;

import lombok.Data;
import org.example.freelancer.entity.Client;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CompanyDTO {
    private Integer id;

    @NotBlank(message = "Company name cannot be empty")
    private String companyName;

    @NotBlank(message = "Phone contact cannot be empty")
    @Size(max = 20, message = "Phone contact must be at most 20 characters long")
    private String phoneContact;

    private String address;

    private String location;

    private ClientDTO client;
}
