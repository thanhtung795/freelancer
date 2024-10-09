package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {
    @Id
    @Column(name = "client_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "from_price", precision = 10, scale = 2)
    private BigDecimal fromPrice;

    @Column(name = "to_price", precision = 10, scale = 2)
    private BigDecimal toPrice;

    @Column(name = "type_price")
    private String typePrice;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Company company;

}
