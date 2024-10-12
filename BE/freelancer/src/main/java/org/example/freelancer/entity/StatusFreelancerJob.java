package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusFreelancerJob {
    Applied("Đã ứng tuyển"),  // Đã ứng tuyển
    Cancelled("Đã hủy"),      // Đã hủy
    InProgress("Đang thực hiện"),  // Đang thực hiện
    Completed("Hoàn thành");   // Hoàn thành

    private final String displayName;

    // Constructor với displayName
    StatusFreelancerJob(String displayName) {
        this.displayName = displayName;
    }

    // Getter cho displayName
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}