package org.example.freelancer.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClientCompanyDTO {
    private Integer clientId;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private CompanyDTO company;

    public ClientCompanyDTO(Integer clientId, String email, String firstName, String lastName, String phoneNumber, CompanyDTO company) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.company = company;
    }
}
