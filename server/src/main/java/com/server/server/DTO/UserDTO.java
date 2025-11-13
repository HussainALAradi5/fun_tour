package com.server.server.DTO;

import com.server.server.Models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Long userId;
    private String userName;
    private String email;
    private String mobileNumber;
    private String phoneNumber;
    private String roleEnum;
    private String countryName;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.mobileNumber = user.getMobileNumber();
        this.phoneNumber = user.getPhoneNumber();
        this.roleEnum = user.getRoleEnum().name();
        this.countryName = user.getCountry() != null ? user.getCountry().getCountryName() : null;
    }

}