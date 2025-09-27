package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.server.Models.User;

@Repository
public interface  UserRepository  extends JpaRepository<User, Long> {
  
}
