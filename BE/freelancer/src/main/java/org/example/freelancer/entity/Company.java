package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "company")
public class Company {
    @Id
    @Column(name = "companyID", nullable = false)
    private Integer id;

    @Column(name = "companyName", nullable = false)
    private String companyName;

    @Column(name = "phoneContact", length = 20)
    private String phoneContact;

    @Column(name = "address")
    private String address;

    @Column(name = "location")
    private String location;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientID")
    private Client clientID;

}