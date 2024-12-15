package org.example.freelancer.dto;

import lombok.Data;

@Data
public class ChatRoomDTO {
    private String roomId;
    private Integer user1Id;
    private Integer user2Id;
    private Integer jobId;
}
