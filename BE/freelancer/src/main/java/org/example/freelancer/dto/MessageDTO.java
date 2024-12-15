package org.example.freelancer.dto;

import lombok.Data;
import org.example.freelancer.entity.Message.MessageType;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Integer id;
    private String content;
    private Integer senderId;
    private Integer receiverId;
    private Integer jobId;
    private MessageType messageType;
    private String senderName;
    private String receiverName;
    private Boolean isRead;
    private LocalDateTime sentAt;
}