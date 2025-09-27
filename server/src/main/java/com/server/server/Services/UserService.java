package com.server.server.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.server.Models.User;
import com.server.server.Repositories.UserRepository;

@Service
public class UserService {
  
  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  public String register(User user){
    
    String encodedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    userRepository.save(user);
    return "User registered successfully with ID: " + user.getUserId();

  }
}
