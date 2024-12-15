package org.example.freelancer.service;

import org.example.freelancer.dto.MessageDTO;
import java.util.List;

public interface MessageService {
    MessageDTO saveMessage(MessageDTO messageDTO);
    List<MessageDTO> getConversation(Integer user1Id, Integer user2Id);
    List<MessageDTO> getJobMessages(Integer jobId);
    void markAsRead(Integer messageId);
}
