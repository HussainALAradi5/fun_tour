package com.server.server.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.server.server.Enums.RoleEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private int age;

    @NotEmpty(message = "you must fill the user name!")
    private String userName;

    @NotEmpty(message = "you must fill the password!")
    private String password;

    @NotEmpty(message = "mobile number should not be empty")
    private String mobileNumber;

    @NotEmpty(message = "phone number should not be empty")
    private String phoneNumber;

    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Email must be valid")
    private String email;

    @ManyToOne
    @JoinColumn(name = "country_id")
    @JsonBackReference
    private Country country;

    @Enumerated(EnumType.STRING)
    private RoleEnum roleEnum;

    @ManyToOne
    @JoinColumn(name = "agency_id")
    private Agency agency;
}