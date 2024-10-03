package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Size(max = 255)
    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Size(max = 255)
    @Column(name = "address")
    private String address;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") // Khóa ngoại tham chiếu đến bảng Account
    @JsonManagedReference // Quản lý mối quan hệ từ User đến Account
    private Account account;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY) // Mối quan hệ ngược với Freelancer
    @JsonBackReference // Ngăn chặn vòng lặp từ Freelancer về User
    private Freelancer freelancer;
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY) // Mối quan hệ ngược với Freelancer
    @JsonBackReference // Ngăn chặn vòng lặp từ Freelancer về User
    private Client client;
}
