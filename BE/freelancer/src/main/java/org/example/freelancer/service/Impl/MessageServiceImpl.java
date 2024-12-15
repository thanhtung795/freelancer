package org.example.freelancer.service.Impl;

import org.example.freelancer.dto.MessageDTO;
import org.example.freelancer.entity.Message;
import org.example.freelancer.repository.MessageRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MessageDTO saveMessage(MessageDTO messageDTO) {
        Message message = new Message();
        message.setSender(userRepository.findById(messageDTO.getSenderId()).orElseThrow());
        message.setReceiver(userRepository.findById(messageDTO.getReceiverId()).orElseThrow());
        message.setContent(messageDTO.getContent());
        message.setMessageType(messageDTO.getMessageType());
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);
        return modelMapper.map(savedMessage, MessageDTO.class);
    }

    @Override
    public List<MessageDTO> getConversation(Integer user1Id, Integer user2Id) {
        return messageRepository.findConversation(user1Id, user2Id)
                .stream()
                .map(msg -> modelMapper.map(msg, MessageDTO.class))
                .toList();
    }

    @Override
    public List<MessageDTO> getJobMessages(Integer jobId) {
        return messageRepository.findByJobIdOrderBySentAtDesc(jobId)
                .stream()
                .map(msg -> modelMapper.map(msg, MessageDTO.class))
                .toList();
    }

    @Override
    public void markAsRead(Integer messageId) {
        Message message = messageRepository.findById(messageId).orElseThrow();
        message.setIsRead(true);
        messageRepository.save(message);
    }
}

