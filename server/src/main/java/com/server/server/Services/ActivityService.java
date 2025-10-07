package com.server.server.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.Models.Activity;
import com.server.server.Repositories.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity updatedActivity) {
        return activityRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedActivity.getName());
                    existing.setDescription(updatedActivity.getDescription());
                    existing.setDurationHours(updatedActivity.getDurationHours());
                    existing.setStartDate(updatedActivity.getStartDate());
                    existing.setEndDate(updatedActivity.getEndDate());
                    existing.setStatus(updatedActivity.getStatus());
                    existing.setStartLocation(updatedActivity.getStartLocation());
                    existing.setEndLocation(updatedActivity.getEndLocation());
                    existing.setTour(updatedActivity.getTour());
                    return activityRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Activity not found with id " + id));
    }

    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
