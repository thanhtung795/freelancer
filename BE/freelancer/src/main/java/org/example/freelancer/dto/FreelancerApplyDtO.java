package org.example.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.freelancer.entity.StatusFreelancerJob;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerApplyDTO {

    @NotNull(message = "Freelancer ID không được để trống")
    private Integer freelancerId;

    @NotBlank(message = "Tên không được để trống")
    private String firstName;

    @NotBlank(message = "Họ không được để trống")
    private String lastName;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Số điện thoại không hợp lệ")
    private String phoneNumber;

    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    private String email;

    private String address;

    private String image;

    @DecimalMin(value = "0.0", inclusive = false, message = "Giá trị hourly rate phải lớn hơn 0")
    private BigDecimal hourlyRate;

    @NotNull(message = "Trạng thái công việc không được để trống")
    private StatusFreelancerJob status;
}
