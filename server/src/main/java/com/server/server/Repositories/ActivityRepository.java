package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.server.Models.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
