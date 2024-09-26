package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID
    @Column(name = "clientID", nullable = false)
    private Integer id;

    @Column(name = "fromPrice", precision = 10, scale = 2, nullable = true) // Nullable clarity
    private BigDecimal fromPrice;

    @Column(name = "toPrice", precision = 10, scale = 2, nullable = true) // Nullable clarity
    private BigDecimal toPrice;

    @Lob
    @Column(name = "typePrice", nullable = false)
    private String typePrice;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private User user;
}
