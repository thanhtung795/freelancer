package org.example.freelancer.dto;

import lombok.Data;

@Data
public class RTCSessionDescription {
    private String type; // "offer" hoặc "answer"
    private String sdp;  // Session Description Protocol
}
