package org.example.freelancer.entity;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusJob {
    InProgress("Đang thực hiện"),
    Completed("Hoàn thành"),
    Pending("Chờ xử lý"),
    Cancle("Hủy bỏ");

    private final String displayName;

    // Constructor với displayName
    StatusJob(String displayName) {
        this.displayName = displayName;
    }

    // Getter cho displayName
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }


    public static StatusJob fromString(String status) {
        for (StatusJob jobStatus : StatusJob.values()) {
            if (jobStatus.getDisplayName().equalsIgnoreCase(status)) {
                return jobStatus;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }

}
