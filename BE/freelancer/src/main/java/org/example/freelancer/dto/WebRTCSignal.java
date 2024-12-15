package org.example.freelancer.dto;

import lombok.Data;

@Data
public class WebRTCSignal {
    private SignalType type;
    private String roomId;
    private String userId;
    private RTCSessionDescription offer;
    private RTCSessionDescription answer;
    private RTCIceCandidate candidate;
}