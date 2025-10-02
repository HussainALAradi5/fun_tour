package com.server.server.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long branchId;
    @NotEmpty(message = "Branch name should not be empty")
    private String branchName;
    @NotEmpty(message = "Phone number must not be empty")
    private String phone;
    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Email must be valid")
    private String email;
    @ManyToOne
    @JoinColumn(name = "agencyId", nullable = false)  
    private Agency agency;
    @ManyToOne
    @JoinColumn(name = "locationId", nullable = false)
    private Location location;
}
