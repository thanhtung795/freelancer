package org.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "education")
public class Education {
    @EmbeddedId
    private EducationId id;

    @MapsId("freelancerID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "freelancerID", nullable = false)
    private Freelancer freelancerID;

    @MapsId("schoolID")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "schoolID", nullable = false)
    private School schoolID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "majorID")
    private Major majorID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "degreeID")
    private Degree degreeID;

    @Column(name = "dateStart")
    private LocalDate dateStart;

    @Column(name = "dateEnd")
    private LocalDate dateEnd;

    @Lob
    @Column(name = "description")
    private String description;

}