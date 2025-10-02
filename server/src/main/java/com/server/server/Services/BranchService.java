package com.server.server.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.server.server.Models.Branch;
import com.server.server.Repositories.BranchRepository;

@Service
public class BranchService {

    @Autowired
    BranchRepository branchRepository;

    public Branch addBranch(Branch branch) {
        if (branchRepository.existsByBranchName(branch.getBranchName())) {
            throw new IllegalArgumentException("Branch with this name already exists.");
        }
        return branchRepository.save(branch);
    }

    public List<Branch> findAllBranches() {
        return branchRepository.findAll();
    }

    public Branch updateBranch(long id, Branch updatedBranch) {
        return branchRepository.findById(id).map(existing -> {
            existing.setBranchName(updatedBranch.getBranchName());
            existing.setPhone(updatedBranch.getPhone());
            existing.setEmail(updatedBranch.getEmail());
            existing.setAgency(updatedBranch.getAgency());
            existing.setLocation(updatedBranch.getLocation());
            return branchRepository.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Branch not found with id " + id));
    }

    public void deleteBranch(long id) {
        if (!branchRepository.existsById(id)) {
            throw new IllegalArgumentException("Branch not found with id " + id);
        }
        branchRepository.deleteById(id);
    }
}
