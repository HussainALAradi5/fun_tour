package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.server.server.Models.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    boolean existsByBranchName(String branchName);
}
