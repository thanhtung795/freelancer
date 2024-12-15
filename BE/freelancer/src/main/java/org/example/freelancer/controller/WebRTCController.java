package org.example.freelancer.controller;

import org.example.freelancer.dto.WebRTCSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/webrtc")
public class WebRTCController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/webrtc.signal")
    public void handleSignal(@Payload WebRTCSignal signal) {
        messagingTemplate.convertAndSend(
                "/topic/webrtc." + signal.getRoomId(),
                signal
        );
    }
}
