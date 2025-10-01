package com.server.server.Models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Agency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long agencyId;
    @NotEmpty(message = "Agency name should not be empty")
    private String agencyName;
    @NotEmpty(message = "Agency code should not be empty")
    private String agencyCode;
    @NotEmpty(message = "phone number must not be empty")
    private String phone;
    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Email must be valid")
    private String email;
    @OneToMany(mappedBy = "agency")
    private List<User> users;
}
