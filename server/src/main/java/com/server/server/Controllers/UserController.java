package com.server.server.Controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.Models.User;
import com.server.server.Services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    UserController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        try {
            String message = userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    String identifier = credentials.get("identifier");
    String password = credentials.get("password");

    Optional<User> userOpt = identifier.contains("@")
        ? userService.findUserByEmail(identifier)
        : userService.findUserByUserName(identifier);

    if (userOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }

    User user = userOpt.get();
    if (!passwordEncoder.matches(password, user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
    }

    return ResponseEntity.ok(user); 
}

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@Valid @RequestBody User updatedUser) {
        try {
            Optional<User> optionalUser = userService.findUserById(updatedUser.getUserId());
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            User existingUser = optionalUser.get();

            String message = userService.updateUser(
                    existingUser,
                    updatedUser.getPassword(),
                    updatedUser.getEmail(),
                    updatedUser.getMobileNumber(),
                    updatedUser.getPhoneNumber());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(message);

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}