package org.example.freelancer.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;

    @Size(max = 255, message = "Họ phải có tối đa 255 ký tự")
    private String firstName;

    @Size(max = 255, message = "Tên phải có tối đa 255 ký tự")
    private String lastName;

    @Size(max = 20, message = "Số điện thoại phải có tối đa 20 ký tự")
    private String phoneNumber;

    @Size(max = 255, message = "Địa chỉ phải có tối đa 255 ký tự")
    private String address;

    private Integer accountId;
}
