package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @CreationTimestamp
    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    // Người gửi tin nhắn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    private User sender;

    // Người nhận tin nhắn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    @JsonIgnore
    private User receiver;

    // Nếu tin nhắn thuộc về một job cụ thể
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    @JsonIgnore
    private Job job;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    // Enum cho loại tin nhắn
    public enum MessageType {
        TEXT,
        FILE,
        IMAGE,
        VOICE,
        VIDEO_CALL
    }
}