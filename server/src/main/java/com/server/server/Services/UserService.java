package com.server.server.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.server.Enums.RoleEnum;
import com.server.server.Models.User;
import com.server.server.Repositories.UserRepository;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  public String register(User user) {
    if (userRepository.existsByUserName(user.getUserName())) {
      throw new IllegalArgumentException("Username is already taken");
    }
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new IllegalArgumentException("Email is already registered");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    if (user.getRoleEnum() == null) {
      user.setRoleEnum(RoleEnum.USER);
    }
    userRepository.save(user);
    return "User registered successfully with ID: " + user.getUserId();
  }

  public List<User> findAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> findUserById(Long userId) {
    return userRepository.findById(userId);
  }

  public String updateUser(User user, String password, String email, String mobileNumber, String phoneNumber) {
    boolean updated = false;
    if (password != null && !password.trim().isEmpty()) {
      user.setPassword(passwordEncoder.encode(password));
      updated = true;
    }

    if (email != null && !email.trim().isEmpty() && !email.equals(user.getEmail())) {
      if (userRepository.existsByEmail(email)) {
        throw new IllegalArgumentException("Email is already registered");
      }
      user.setEmail(email);
      updated = true;
    }

    if (mobileNumber != null && !mobileNumber.trim().isEmpty()) {
      user.setMobileNumber(mobileNumber);
      updated = true;
    }

    if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
      user.setPhoneNumber(phoneNumber);
      updated = true;
    }

    if (updated) {
      userRepository.save(user);
      return "User updated successfully.";
    } else {
      return "No valid fields provided for update.";
    }
  }
}
