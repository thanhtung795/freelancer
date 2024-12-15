package org.example.freelancer.dto;

import lombok.Data;

@Data
public class RTCIceCandidate {
    private String candidate;
    private String sdpMid;
    private Integer sdpMLineIndex;
    private String usernameFragment;
}

