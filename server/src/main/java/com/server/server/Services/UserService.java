package com.server.server.Services;

import java.util.List;

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

 
}
