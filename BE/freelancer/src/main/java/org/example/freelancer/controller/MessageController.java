package org.example.freelancer.controller;


import org.example.freelancer.dto.MessageDTO;
import org.example.freelancer.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void processMessage(@Payload MessageDTO messageDTO) {
        MessageDTO saved = messageService.saveMessage(messageDTO);
        messagingTemplate.convertAndSendToUser(
                messageDTO.getReceiverId().toString(),
                "/queue/messages",
                saved
        );
    }

    @GetMapping("/conversation/{user1Id}/{user2Id}")
    public List<MessageDTO> getConversation(
            @PathVariable Integer user1Id,
            @PathVariable Integer user2Id
    ) {
        return messageService.getConversation(user1Id, user2Id);
    }

    @GetMapping("/job/{jobId}")
    public List<MessageDTO> getJobMessages(@PathVariable Integer jobId) {
        return messageService.getJobMessages(jobId);
    }

    @PutMapping("/{messageId}/read")
    public void markAsRead(@PathVariable Integer messageId) {
        messageService.markAsRead(messageId);
    }
}


